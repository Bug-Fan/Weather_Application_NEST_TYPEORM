import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const DbConnection = [
  {
    provide: 'DataSource',
    useFactory: async () => {
      const configService = new ConfigService();
      const datasource = new DataSource({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [],
        logging: true,
      });
      return await datasource.initialize();
    },
  },
];
