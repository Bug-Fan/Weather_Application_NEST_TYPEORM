import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { LogService } from 'src/db/log.service';
import { LogRequestDto } from 'src/dto/request/log.request.dto';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logservice: LogService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    try {
      const { body, route, user, headers, method } = request;
      const userId = user?.userId;
      const host = headers.host;
      const path = route.path;
      const log = new LogRequestDto(host, path, method, body, userId);
      const generated = await this.logservice.addlog(log);
    } catch (error) {
      console.log(error);
    } finally {
      return next.handle();
    }
  }
}
