import { Injectable, OnModuleInit } from '@nestjs/common';
import * as cron from 'node-cron';
import { PrismaService } from 'src/prisma/prisma.service';
import { Query } from '@prisma/client';
import { ScraperService } from 'src/scraper/scraper.service';
import { TwilioService } from 'src/twilio/twilio.service';
import { ResendService } from 'src/resend/resend.service';
import { QueryStatus } from '../query/query.entity';

@Injectable()
export class CronService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly scraperService: ScraperService,
    private readonly twilioService: TwilioService,
    private readonly resendService: ResendService,
  ) {}

  async onModuleInit() {
    this.start();
  }

  start() {
    const task = cron.schedule('*/1 * * * *', async () => {
      const match = await this.scraperService.scrape();

      if (!match) {
        console.log('No match found', (new Date()).toLocaleString());
        this.prisma.query.create({
          data: {
            status: QueryStatus.PENDING,
          },
        }).catch(console.error);
        return;
      }

      let avariableQuery: Query;
      try {
        avariableQuery = await this.prisma.query.create({
          data: {
            status: QueryStatus.AVARILABLE,
          },
        });
      } catch (error) {
        console.error(error);
        return;
      }

      await this.twilioService.sendMessage();
      await this.resendService.sendMails({ queryId: avariableQuery.id });
      task.stop();
    });
  }
}
