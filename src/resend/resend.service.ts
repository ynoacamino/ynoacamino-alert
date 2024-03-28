import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResendService extends Resend {
  constructor(private readonly prisma: PrismaService) {
    const { RESEND_API_KEY } = process.env;
    super(RESEND_API_KEY);
  }

  getAddresses() {
    return this.prisma.mailAddress.findMany();
  }

  async sendMails({ queryId }:{ queryId: number }) {
    const mails = await this.getAddresses();

    const mailMessages = mails.map(async ({ address }) => this.emails.send({
      from: 'onboarding@resend.dev',
      to: address,
      subject: 'Talon de pago para Ingeniería de Sistemas disponible!',
      html: `<p
      style="font-family: Arial, sans-serif; font-size: 16px; color: #333333; line-height: 1.5; font-size: 1.4rem"
    >
      <span style="font-weight: 700">
        La carrera profesional de Ingeniería de Sistemas ya está disponible! 
      </span>
      <br>
      Visita:
      <a
        href="http://extranet.unsa.edu.pe/sisacad/talonpago_pregrado_a_nuevo/" style="color: #0066cc; text-decoration: none;"
      >
        http://extranet.unsa.edu.pe/sisacad/talonpago_pregrado_a_nuevo/
      </a>
      para matricularte.
    </p> 
      `,
    }));

    const messages = mails.map(({ id }) => this.prisma.message.create({
      data: {
        mailAddressId: id,
        queryId,
      },
    }));

    await Promise.all(messages);
    await Promise.all(mailMessages);
  }
}
