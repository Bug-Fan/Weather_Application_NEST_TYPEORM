export class RegistrationResponseDto {
  status: number;
  message: string;

  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}
