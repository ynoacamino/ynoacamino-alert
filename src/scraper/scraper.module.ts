import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ScraperService } from './scraper.service';

@Module({
  providers: [ScraperService],
  exports: [ScraperService],
  imports: [PrismaModule],
})
export class ScraperModule {}
