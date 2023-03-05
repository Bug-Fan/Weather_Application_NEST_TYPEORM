import { ApiProperty } from '@nestjs/swagger';

export class ForecastResponseDto {
  @ApiProperty({
    type: String,
    example: 'moderate rain',
    description: 'Weather description',
  })
  Description: string;

  @ApiProperty({
    type: Number,
    example: '32.4',
    description: 'Current Temperature',
  })
  Temperature: number;

  @ApiProperty({
    type: Number,
    example: '36.8',
    description: 'Feels like Temperature',
  })
  feelsLike: number;

  @ApiProperty({
    type: Number,
    example: '40.2',
    description: 'Maximum Temperature',
  })
  maximumTemperature: number;

  @ApiProperty({
    type: Number,
    example: '28.1',
    description: 'Minimum Temperature',
  })
  minimumTemperature: number;

  @ApiProperty({ type: Number, example: '1015', description: 'Air Pressure' })
  Pressure: number;

  @ApiProperty({
    type: Number,
    example: '64',
    description: 'Percentage of Water Vapour',
  })
  Humidity: number;

  @ApiProperty({
    type: Number,
    example: '6000',
    description: 'Clearness of Air',
  })
  Visibility: number;

  @ApiProperty({ type: Number, example: '2.06', description: 'Wind Speed' })
  Speed: number;

  constructor(
    description,
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    visibility,
    speed,
  ) {
    this.Description = description;
    this.Temperature = temp;
    this.feelsLike = feels_like;
    this.minimumTemperature = temp_min;
    this.maximumTemperature = temp_max;
    this.Pressure = pressure;
    this.Humidity = humidity;
    this.Visibility = visibility;
    this.Speed = speed;
  }
}
