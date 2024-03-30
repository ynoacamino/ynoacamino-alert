import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MailService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  getAddress() {
    return this.prisma.mailAddress.findMany();
  }

  getUniqueAddress({ address }: { address: string }) {
    return this.prisma.mailAddress.findUnique({
      where: {
        address,
      },
    });
  }

  crateAddress({ address }: { address: string }) {
    return this.prisma.mailAddress.create({
      data: {
        address,
      },
    });
  }

  changeActiveStatus({ address, active }: { address: string, active: boolean }) {
    return this.prisma.mailAddress.update({
      where: {
        address,
      },
      data: {
        active,
      },
    });
  }
}
