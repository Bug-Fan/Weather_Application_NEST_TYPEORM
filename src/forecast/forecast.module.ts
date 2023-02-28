import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ForecastService } from './forecast.service';

@Module({
  imports: [ConfigModule],
  providers: [ForecastService],
  exports: [ForecastService],
})
export class ForecastModule {}
