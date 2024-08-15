import { Module } from '@nestjs/common';
import { DiscordjsService } from './discordjs.service';

@Module({
  providers: [DiscordjsService],
  exports: [DiscordjsService],
  imports: [],
})
export class DiscordjsModule {}
