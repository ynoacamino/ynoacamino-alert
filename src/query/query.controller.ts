import {
  Body, Controller, Get, Post, Query,
} from '@nestjs/common';
import { z } from 'zod';
import { QueryService } from './query.service';

@Controller('query')
export class QueryController {
  constructor(private readonly queryService: QueryService) {}

  @Get()
  async findAll(
  @Query('skip') skip: string,
  ) {
    if (!skip) return this.queryService.findAll();
    return {
      querys: await this.queryService.findPart({ skip }),
      info: await this.queryService.getInfo(),
    };
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
