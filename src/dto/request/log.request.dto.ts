export class LogRequestDto {
  host: string;
  path: string;
  method: string;
  body: string;
  userId: string | null;

  constructor(host, path, method, body, userId: string | undefined) {
    this.host = host;
    this.path = path;
    this.method = method;
    this.body = body;
    if (userId !== 'admin') {
      this.userId = userId;
    } else {
      this.userId = null;
    }
  }
}
