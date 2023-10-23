import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/auth/auth.constants';
import jwtConfig from '../jwt.config';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tokens = this.extractTokensFromCookie(request);
    if (!tokens) {
      throw new UnauthorizedException();
    }
    await this.validateTokens(tokens, request);
    return true;
  }

  private async validateTokens(tokens: string[], request: Request) {
    try {
      const [accessJwt, refreshJwt] = tokens;
      const [accessJwtPayload, refreshJwtPayload] = await Promise.all([
        this.jwtService.verifyAsync(accessJwt, this.jwtConfiguration),
        this.jwtService.verifyAsync(refreshJwt, this.jwtConfiguration),
      ]);

      if (accessJwtPayload.sub !== refreshJwtPayload.sub) {
        throw new UnauthorizedException();
      }

      request[REQUEST_USER_KEY] = accessJwtPayload;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokensFromCookie(request: Request): string[] | undefined {
    const { accessToken, refreshToken } = request.cookies;
    return [accessToken, refreshToken];
  }
}
