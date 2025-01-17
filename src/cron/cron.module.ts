import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ScraperModule } from 'src/scraper/scraper.module';
import { ResendModule } from 'src/resend/resend.module';
import { CronService } from './cron.service';

@Module({
  providers: [CronService],
  imports: [PrismaModule, ScraperModule, ResendModule],
})
export class CronModule {}
