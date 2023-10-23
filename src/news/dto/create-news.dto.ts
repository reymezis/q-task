import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsNotBlank } from '../../common/decorators/isNotBlank.decorator';

export class CreateNewsDto {
  @ApiProperty({ description: 'News title' })
  @IsString()
  @IsNotBlank()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'News description' })
  @IsString()
  @IsNotBlank()
  @IsNotEmpty()
  description: string;
}
