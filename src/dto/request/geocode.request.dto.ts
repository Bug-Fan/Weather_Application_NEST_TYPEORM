import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class GeocodeRequestDto {
  @ApiProperty({ type: String, example: 'Ahmedabad' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  location: string;
}
