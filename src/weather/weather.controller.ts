import { Body, Controller, Get } from '@nestjs/common';
import {
  // ForecastRequestDto,
  GeocodeRequestDto,
} from 'src/dto/request/geocode.request.dto';
import { GeocodeResponseDto } from 'src/dto/response/geocode.response.dto';
// import { ForecastResponseDto } from 'src/dto/response/geocode.response.dto';
// import { ForecastService } from 'src/forecast/forecast.service';
import { GeocodeService } from 'src/geocode/geocode.service';

@Controller('weather')
export class WeatherController {
  constructor(
    // private forecastService: ForecastService,
    private geocodeService: GeocodeService,
  ) {}

  // @Get('forecast')
  // async getForecast(
  //   @Body() forecastRequestDto: ForecastRequestDto,
  // ): Promise<ForecastResponseDto> {
  //   const forecast: ForecastResponseDto =
  //     await this.forecastService.getForecast(forecastRequestDto);
  //   return forecast;
  // }

  @Get('geocode')
  async getGeocode(
    @Body() geocodeRequestDto: GeocodeRequestDto,
  ): Promise<GeocodeResponseDto> {
    return await this.geocodeService.getGeocode(geocodeRequestDto);
  }
}
