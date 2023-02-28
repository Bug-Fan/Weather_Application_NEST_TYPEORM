export class ForecastResponseDto {
  description: string;
  actualTemp: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  pressure: number;
  humidity: number;
  visibility: number;
  windSpeed: number;

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
    this.description = description;
    this.actualTemp = temp;
    this.feelsLike = feels_like;
    this.tempMin = temp_min;
    this.tempMax = temp_max;
    this.pressure = pressure;
    this.humidity = humidity;
    this.visibility = visibility;
    this.windSpeed = speed;
  }
}
