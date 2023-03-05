import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class GeocodeRequestDto {
  @ApiProperty({
    type: String,
    example: 'Ahmedabad',
    description: 'Location to be searched',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  location: string;
}
