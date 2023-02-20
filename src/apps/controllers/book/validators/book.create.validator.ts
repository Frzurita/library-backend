import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsUUID, IsNotEmpty } from 'class-validator';

export class BookCreateValidator {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
}
