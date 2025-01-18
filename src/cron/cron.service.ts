import { Injectable, OnModuleInit } from '@nestjs/common';
import * as cron from 'node-cron';
import { PrismaService } from 'src/prisma/prisma.service';
import { Query } from '@prisma/client';
import { ScraperService } from 'src/scraper/scraper.service';
import { ResendService } from 'src/resend/resend.service';
import { DiscordjsService } from 'src/discordjs/discordjs.service';
import { QueryStatus } from '../query/query.entity';

@Injectable()
export class CronService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly scraperService: ScraperService,
    private readonly resendService: ResendService,
  ) { }

  start() {
    const task = cron.schedule('*/1 * * * *', async () => {
      const match = await this.scraperService.scrape();

      if (!match) return;

      let avariableQuery: Query;
      try {
        avariableQuery = await this.prisma.query.create({
          data: {
            status: QueryStatus.AVAILABLE,
          },
        });
      } catch (error) {
        console.error(error);
        return;
      }

      DiscordjsService.sendAvailableMessage();

      await this.resendService.sendMails({ queryId: avariableQuery.id });
      task.stop();
    });
  }

  onModuleInit() {
    this.start();
  }
}
