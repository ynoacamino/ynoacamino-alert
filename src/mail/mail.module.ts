import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [PrismaModule],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
