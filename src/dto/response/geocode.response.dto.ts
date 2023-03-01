export class GeocodeResponseDto {
  status: boolean;
  message: string;
  matches?: any | undefined;

  constructor(status, message, matches?: any | undefined) {
    this.status = status;
    this.message = message;
    this.matches = matches;
  }
}
