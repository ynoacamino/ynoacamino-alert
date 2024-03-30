import { Module } from '@nestjs/common';
import { QueryModule } from './query/query.module';
import { CronModule } from './cron/cron.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [QueryModule, CronModule, MailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
