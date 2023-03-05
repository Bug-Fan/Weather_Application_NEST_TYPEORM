import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { GeocodeRequestDto } from 'src/dto/request/geocode.request.dto';
import { GeocodeResponseDto } from 'src/dto/response/geocode.response.dto';

@Injectable()
export class GeocodeService {
  constructor(private configService: ConfigService) {}

  async getGeocode(
    geocodeRequestDto: GeocodeRequestDto,
  ): Promise<GeocodeResponseDto> {
    const { location } = geocodeRequestDto;
    const url = `http://dev.virtualearth.net/REST/v1/Locations?query=${encodeURI(
      location,
    )}&key=${this.configService.get('GEOCODE_API_TOKEN')}`;

    try {
      const data = await axios({
        method: 'get',
        url,
      });
      const { resources, estimatedTotal } = data.data.resourceSets[0];
      if (estimatedTotal === 0) {
        throw new NotFoundException();
      }
      const matches = [];
      resources.forEach((element) => {
        const place = element.name;
        const [latitude, longitude] = element.point.coordinates;
        const loc = new Object({ place, latitude, longitude });
        matches.push(loc);
      });
      return new GeocodeResponseDto(true, 'Results recieved', matches);
    } catch (error) {
      console.log(error);
      if (error.status === 404) {
        throw new BadRequestException(
          'Unable to find matches for the entered place.',
        );
      } else if (error.cause.code === 'EAI_AGAIN') {
        throw new NotFoundException('Unable to reach Geocode API');
      }
    }
  }
}
