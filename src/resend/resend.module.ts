import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ResendService } from './resend.service';

@Module({
  providers: [ResendService],
  exports: [ResendService],
  imports: [PrismaModule],
})
export class ResendModule {}
