import { Injectable } from '@nestjs/common';
import { Query } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryStatus } from './query.entity';

@Injectable()
export class QueryService {
  constructor(private readonly prisma: PrismaService) {}

  findPart({ skip }: { skip: string }): Promise<Query[]> {
    const skipInt = Number(skip) > 0 ? Number(skip) : 0;
    const TAKE = 30;

    return this.prisma.query.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: TAKE,
      skip: TAKE * skipInt,
    });
  }

  findAll(): Promise<Query[]> {
    return this.prisma.query.findMany();
  }

  create({ status } : { status: string }): Promise<Query> {
    return this.prisma.query.create({
      data: {
        status,
      },
    });
  }

  async getInfo() {
    return {
      total: await this.prisma.query.count(),
      totalPending: await this.prisma.query.count({
        where: {
          status: QueryStatus.PENDING,
        },
      }),
      totalTimeOut: await this.prisma.query.count({
        where: {
          status: QueryStatus.TIMEOUT,
        },
      }),
    };
  }
}
