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
  async getMail(@Query('address') address: string) {
    if (address) {
      const mail = await this.mailService.getUniqueAddress({ address });

      if (!mail) {
        return {
          error: 'Mail not found',
        };
      }
      return mail;
    }
    return this.mailService.getAddress();
  }

  @Post()
  async sendMail(@Body() body: { address: string }) {
    const schema = z.object({
      address: z.string(),
    });

    try {
      const query = schema.parse(body);

      const mail = await this.mailService.crateAddress({ address: query.address });

      if (!mail) {
        return {
          error: 'Mail not created',
        };
      }

      return mail;
    } catch (error: any) {
      return {
        error: error.errors,
      };
    }
  }

  @Put()
  async updateMail(@Body() body: { address: string, active: boolean }) {
    const schema = z.object({
      address: z.string(),
      active: z.boolean(),
    });

    try {
      const query = schema.parse(body);

      const mail = await this.mailService.changeActiveStatus({
        active: query.active, address: query.address,
      });

      if (!mail) {
        return {
          error: 'Mail not updated',
        };
      }
      return mail;
    } catch (error: any) {
      return {
        error: error.errors,
      };
    }
  }
}
