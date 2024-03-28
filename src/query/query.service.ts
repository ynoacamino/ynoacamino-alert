import { Injectable } from '@nestjs/common';
import { Query } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QueryService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Query[]> {
    return this.prisma.query.findMany();
  }

  create({ status } : { status: string }): Promise<Query> {
    return this.prisma.query.create({
      data: {
        status,
      }
    });
  }
}
