import { IsNumber } from 'class-validator';

export class ForecastRequestDto {
  @IsNumber({ maxDecimalPlaces: 10 })
  latitude: number;

  @IsNumber({ maxDecimalPlaces: 10 })
  longitude: number;
}
