import { Module } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { ForecastModule } from 'src/forecast/forecast.module';
import { GeocodeModule } from 'src/geocode/geocode.module';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { WeatherController } from './weather.controller';

@Module({
  imports: [ForecastModule, GeocodeModule, DbModule],
  controllers: [WeatherController],
  providers: [LoggingInterceptor],
})
export class WeatherModule {}
