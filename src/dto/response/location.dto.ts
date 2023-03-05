export class LocationDto {
  place: string;
  latitude: number;
  longitude: number;

  constructor(place, latitude, longitude) {
    this.place = place;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
