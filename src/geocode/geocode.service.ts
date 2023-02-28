import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { GeocodeRequestDto } from 'src/dto/request/geocode.request.dto';
import { GeocodeResponseDto } from 'src/dto/response/geocode.response.dto';

@Injectable()
export class GeocodeService {
  constructor(private configService: ConfigService) {}

  async getGeocode(geocodeRequestDto: GeocodeRequestDto) {
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
          null,
        );
      }
      const matches = [];
      resources.forEach((element) => {
        // console.log(element.name, element.point.coordinates);
        const place = element.name;
        const latitude = element.point.coordinates[0];
        const longitude = element.point.coordinates[1];

        const loc = new Object({ place, latitude, longitude });
        // console.log(loc);
        matches.push(loc);
      });
      const result = new GeocodeResponseDto(true, 'Results recieved', matches);
      return result;
      // console.log(matches);
    } catch (error) {
      if (error.response.status === 404) {
        throw new BadRequestException(
          'The weather forecast for  place you entered cannot be found because the place does not exist.',
        );
      }
    }
  }
}
