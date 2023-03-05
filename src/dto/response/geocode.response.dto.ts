import { ApiProperty } from '@nestjs/swagger';
import { LocationDto } from './location.dto';

export class GeocodeResponseDto {
  @ApiProperty({ type: Boolean, description: 'Matches found or not' })
  status: boolean;

  @ApiProperty({ type: String, description: 'Geocode Response Message' })
  message: string;

  @ApiProperty({ description: 'Matches for the location' })
  matches?: LocationDto[] | undefined;

  constructor(status, message, matches?: LocationDto[] | undefined) {
    this.status = status;
    this.message = message;
    this.matches = matches;
  }
}
