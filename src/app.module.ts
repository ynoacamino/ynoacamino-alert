import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QueryModule } from './query/query.module';
import { CronModule } from './cron/cron.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    QueryModule,
    CronModule,
    MailModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
