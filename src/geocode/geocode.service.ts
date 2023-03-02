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
        return new GeocodeResponseDto(
          false,
          'No results found for the place entered',
        );
      }
      const matches = [];
      resources.forEach((element) => {
        // console.log(element.name, element.point.coordinates);
        const place = element.name;
        const [latitude, longitude] = element.point.coordinates;

        const loc = new Object({ place, latitude, longitude });
        // console.log(loc);
        matches.push(loc);
      });
      return new GeocodeResponseDto(true, 'Results recieved', matches);
      // console.log(matches);
    } catch (error) {
      if (error.cause.code === 'EAI_AGAIN') {
        throw new NotFoundException('Unable to reach Geocode API');
      }
      if (error.response.status === 404) {
        throw new BadRequestException('Unable to find locations');
      }
    }
  }
}
