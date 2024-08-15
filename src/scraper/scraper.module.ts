import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DiscordjsModule } from 'src/discordjs/discordjs.module';
import { ScraperService } from './scraper.service';

@Module({
  providers: [ScraperService],
  exports: [ScraperService],
  imports: [PrismaModule, DiscordjsModule],
})
export class ScraperModule {}
