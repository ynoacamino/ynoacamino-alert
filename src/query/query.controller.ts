import { Body, Controller, Get, Post } from '@nestjs/common';
import { QueryService } from './query.service';
import { Query } from '@prisma/client';
import { z } from 'zod';

@Controller('query')
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @Get()
  findAll(): Promise<Query[]> {
    return this.queryService.findAll();
  }

  @Post()
  create(@Body() data: unknown) {
    const schema = z.object({
      status: z.string(),
    });

    try {
      const query = schema.parse(data);

      return this.queryService.create(query);

    } catch (error: any) {
      return {
        error: error.errors,
      };
    }
  }
}
