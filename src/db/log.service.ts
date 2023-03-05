import { Inject, Injectable } from '@nestjs/common';
import { LogRequestDto } from 'src/dto/request/log.request.dto';
import { DataSource } from 'typeorm';
import { Log } from './entities/log.entity';

@Injectable()
export class LogService {
  constructor(@Inject('DataSource') private dataSource: DataSource) {}

  async addlog(logRequestDto: LogRequestDto) {
    try {
      const addedlog = await this.dataSource.manager.insert(Log, logRequestDto);
    } catch (error) {
      console.log(`Log not added \n ${error}`);
    }
  }
}
