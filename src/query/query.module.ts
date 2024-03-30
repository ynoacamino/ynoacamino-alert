import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QueryController } from './query.controller';
import { QueryService } from './query.service';

@Module({
  controllers: [QueryController],
  providers: [QueryService],
  imports: [PrismaModule],
})
export class QueryModule {}
