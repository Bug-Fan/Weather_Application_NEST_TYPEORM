import { Module } from '@nestjs/common';
import { ForecastModule } from 'src/forecast/forecast.module';
import { WeatherController } from './weather.controller';

@Module({
  imports: [ForecastModule],
  controllers: [WeatherController],
})
export class WeatherModule {}
