import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DbConnection } from './database.connection';
import { LogService } from './log.service';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [...DbConnection, LogService],
  exports: [...DbConnection, LogService],
})
export class DbModule {}
