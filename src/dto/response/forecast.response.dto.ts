export class ForecastResponseDto {
  Description: string;
  Temperature: number;
  'Feels Like': number;
  'Maximum Temperature': number;
  'Minimum Temperature': number;
  Pressure: number;
  Humidity: number;
  Visibility: number;
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
    this['Feels Like'] = feels_like;
    this['Minimum Temperature'] = temp_min;
    this['Maximum Temperature'] = temp_max;
    this.Pressure = pressure;
    this.Humidity = humidity;
    this.Visibility = visibility;
    this.Speed = speed;
  }
}
