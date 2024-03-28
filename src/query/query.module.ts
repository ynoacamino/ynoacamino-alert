import { Module } from '@nestjs/common';
import { QueryController } from './query.controller';
import { QueryService } from './query.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [QueryController],
  providers: [QueryService],
  imports: [PrismaModule]
})
export class QueryModule {}
