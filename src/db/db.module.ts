import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DbConnection } from './database.connection';

@Module({
  imports: [ConfigModule, AuthModule],
  providers: [...DbConnection],
  exports: [...DbConnection],
})
export class DbModule {}
