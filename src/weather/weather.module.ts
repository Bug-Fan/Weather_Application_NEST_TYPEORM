import { Module } from '@nestjs/common';
import { ForecastModule } from 'src/forecast/forecast.module';
import { GeocodeModule } from 'src/geocode/geocode.module';
import { WeatherController } from './weather.controller';

@Module({
  imports: [ForecastModule, GeocodeModule],
  controllers: [WeatherController],
})
export class WeatherModule {}
