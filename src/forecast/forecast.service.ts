import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
// import { ForecastRequestDto } from 'src/dto/request/geocode.request.dto';
// import { ForecastResponseDto } from 'src/dto/response/forecast.response.dto';

@Injectable()
export class ForecastService {
  constructor(private configService: ConfigService) {}
  // async getForecast(
  //   forecastRequestDto: ForecastRequestDto,
  // ): Promise<ForecastResponseDto> {
  //   const { location } = forecastRequestDto;
  //   const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${this.configService.get<string>(
  //     'FORECAST_API_TOKEN',
  //   )}`;

  //   try {
  //     const data = await axios({
  //       method: 'get',
  //       url,
  //     });

  //     const { weather, main, visibility, wind } = data.data;
  //     const [{ description }] = weather;
  //     const { temp, feels_like, temp_max, temp_min, pressure, humidity } = main;
  //     const { speed } = wind;
  //     console.log(data);
  //     const forecastResponseDto = new ForecastResponseDto(
  //       description,
  //       temp,
  //       feels_like,
  //       temp_min,
  //       temp_max,
  //       pressure,
  //       humidity,
  //       visibility,
  //       speed,
  //     );
  //     return forecastResponseDto;
  //   } catch (error) {
  //     if (error.response.status === 404) {
  //       throw new BadRequestException(
  //         'The weather forecast for  place you entered cannot be found because the place does not exist.',
  //       );
  //       // console.log(error);
  //     }
  //   }
  // }
}
