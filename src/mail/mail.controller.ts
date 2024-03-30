import {
  Body,
  Controller, Get, Post, Put, Query,
} from '@nestjs/common';
import { z } from 'zod';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
  ) {}

  @Get()
  getMail(@Query('address') address: string) {
    if (address) {
      return this.mailService.getUniqueAddress({ address });
    }
    return this.mailService.getAddress();
  }

  @Post()
  sendMail(@Body() body: { address: string }) {
    const schema = z.object({
      address: z.string(),
    });

    try {
      const query = schema.parse(body);

      return this.mailService.crateAddress({ address: query.address });
    } catch (error: any) {
      return {
        error: error.errors,
      };
    }
  }

  @Put()
  updateMail(@Body() body: { address: string, active: boolean }) {
    const schema = z.object({
      address: z.string(),
      active: z.boolean(),
    });

    try {
      const query = schema.parse(body);

      return this.mailService.changeActiveStatus({
        active: query.active, address: query.address,
      });
    } catch (error: any) {
      return {
        error: error.errors,
      };
    }
  }
}
