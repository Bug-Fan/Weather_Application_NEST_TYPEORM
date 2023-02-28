import { Module } from '@nestjs/common';
import { WeatherModule } from './weather/weather.module';
import { ForecastModule } from './forecast/forecast.module';
import { ConfigModule } from '@nestjs/config';
import { GeocodeModule } from './geocode/geocode.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WeatherModule,
    ForecastModule,
    GeocodeModule,
    DbModule,
  ],
})
export class AppModule {}
