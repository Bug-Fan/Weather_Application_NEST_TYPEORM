export class LoginResponseDto {
  status: boolean;
  message: string;
  token: string | null;

  constructor(status, message, token) {
    this.status = status;
    this.message = message;
    if (token) {
      this.token = token;
    }
  }
}
