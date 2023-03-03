import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude } from 'class-validator';

export class ForecastRequestDto {
  @ApiProperty({ type: Number, example: '2.00212' })
  @IsLatitude()
  latitude: number;

  @ApiProperty({ type: Number, example: '2.00212' })
  @IsLongitude()
  longitude: number;
}
