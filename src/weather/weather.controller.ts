import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GeocodeRequestDto } from 'src/dto/request/geocode.request.dto';
import { GeocodeResponseDto } from 'src/dto/response/geocode.response.dto';
import { ForecastResponseDto } from 'src/dto/response/forecast.response.dto';
import { ForecastService } from 'src/forecast/forecast.service';
import { GeocodeService } from 'src/geocode/geocode.service';
import { ForecastRequestDto } from 'src/dto/request/forecast.request.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { RoleGuard } from 'src/guards/role.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), new RoleGuard('user'))
@UseInterceptors(LoggingInterceptor)
@Controller('weather')
export class WeatherController {
  constructor(
    private forecastService: ForecastService,
    private geocodeService: GeocodeService,
  ) {}

  @ApiTags('forecast')
  @ApiOkResponse({ description: 'Forecast recieved' })
  @ApiNotFoundResponse({ description: 'Unable to reach forecast service' })
  @ApiBadRequestResponse({
    description: 'Forecast not found for entered place',
  })
  @Get('forecast')
  async getForecast(
    @Query() forecastRequestDto: ForecastRequestDto,
  ): Promise<ForecastResponseDto> {
    const forecast: ForecastResponseDto =
      await this.forecastService.getForecast(forecastRequestDto);
    return forecast;
  }

  @ApiTags('geocode')
  @ApiOkResponse({ description: 'Geocodes recieved' })
  @ApiNotFoundResponse({ description: 'Unable to reach geocode service' })
  @ApiBadRequestResponse({
    description: 'Geocodes not found for entered place',
  })
  @Get('geocode')
  async getGeocode(
    @Query() geocodeRequestDto: GeocodeRequestDto,
  ): Promise<GeocodeResponseDto> {
    return await this.geocodeService.getGeocode(geocodeRequestDto);
  }
}
