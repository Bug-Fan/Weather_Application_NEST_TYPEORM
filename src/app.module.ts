import { Module } from '@nestjs/common';
import { WeatherModule } from './weather/weather.module';
import { ForecastModule } from './forecast/forecast.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WeatherModule,
    ForecastModule,
  ],
})
export class AppModule {}
