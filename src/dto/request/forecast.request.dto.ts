import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude } from 'class-validator';

export class ForecastRequestDto {
  @ApiProperty({
    type: Number,
    example: '2.00212',
    description: 'Latitude of the place',
  })
  @IsLatitude()
  latitude: number;

  @ApiProperty({
    type: Number,
    example: '2.00212',
    description: 'Longitude of the place',
  })
  @IsLongitude()
  longitude: number;
}
