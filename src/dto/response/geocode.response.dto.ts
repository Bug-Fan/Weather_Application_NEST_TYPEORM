export class GeocodeResponseDto {
  status: boolean;
  message: string;
  matches: any | null;

  constructor(status, message, matches) {
    this.status = status;
    this.message = message;
    if (matches) {
      this.matches = matches;
    }
  }
}
