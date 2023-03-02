import { Inject, Injectable } from '@nestjs/common';
import { LogRequestDto } from 'src/dto/request/log.request.dto';
import { DataSource } from 'typeorm';
import { Log } from './entities/log.entity';

@Injectable()
export class LogService {
  constructor(@Inject('DataSource') private dataSource: DataSource) {}

  async addlog(logRequestDto: LogRequestDto) {
    const { host, path, method, body, userId } = logRequestDto;

    try {
      const addedlog = await this.dataSource.manager.insert(Log, {
        host,
        path,
        method,
        body,
        userId,
      });
      if (addedlog) {
        console.log('Log added');
      }
    } catch (error) {
      console.log('Log not added');
    }
  }
}
