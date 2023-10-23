import { IsNotEmpty, IsString } from 'class-validator';
import { IsNotBlank } from '../../common/decorators/isNotBlank.decorator';

export class CreateNewsDto {
  @IsString()
  @IsNotBlank()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotBlank()
  @IsNotEmpty()
  description: string;
}
