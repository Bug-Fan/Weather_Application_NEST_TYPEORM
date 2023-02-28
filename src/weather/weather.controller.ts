import { Body, Controller, Get } from '@nestjs/common';
import { ForecastRequestDto } from 'src/dto/request/forecast.request.dto';
import { ForecastResponseDto } from 'src/dto/response/forecast.response.dto';
import { ForecastService } from 'src/forecast/forecast.service';

@Controller('weather')
export class WeatherController {
  constructor(private forecastService: ForecastService) {}

  @Get('forecast')
  async getForecast(
    @Body() forecastRequestDto: ForecastRequestDto,
  ): Promise<ForecastResponseDto> {
    const forecast: ForecastResponseDto =
      await this.forecastService.getForecast(forecastRequestDto);
    return forecast;
  }
}
