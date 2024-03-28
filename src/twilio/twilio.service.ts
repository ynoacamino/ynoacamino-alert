import { Injectable } from '@nestjs/common';
import * as twilio from 'twilio';

@Injectable()
export class TwilioService {
  private readonly TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

  private readonly TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;

  private readonly TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

  private readonly MESSAGE = 'La carrera profesional de Ingeniería de Sistemas ya está disponible.\nVisita: http://extranet.unsa.edu.pe/sisacad/talonpago_pregrado_a_nuevo/ para matricularte.';

  private readonly NUMBERS = [
    '+51935761921',
  ];

  async sendMessage() {
    const client = twilio(this.TWILIO_ACCOUNT_SID, this.TWILIO_AUTH_TOKEN);

    const from = `whatsapp:${this.TWILIO_PHONE_NUMBER}`;

    const messages = this.NUMBERS.map((number) => client.messages.create({
      body: this.MESSAGE,
      from,
      to: `whatsapp:${number}`,
    }));

    try {
      const sends = await Promise.all(messages);

      sends.forEach((send) => console.log(send));
    } catch (error) {
      console.error(error);
    }
  }

  async initService() {
    const client = twilio(this.TWILIO_ACCOUNT_SID, this.TWILIO_AUTH_TOKEN);

    const from = `whatsapp:${this.TWILIO_PHONE_NUMBER}`;

    const messages = this.NUMBERS.map((number) => client.messages.create({
      body: 'Hola, soy el bot que te avisara cuando la carrera de Ingeniería de Sistemas esté disponible para matrícula. Por favor, no respondas a este mensaje.',
      from,
      to: `whatsapp:${number}`,
    }));

    try {
      const sends = await Promise.all(messages);

      sends.forEach((send) => console.log(send));
    } catch (error) {
      console.error(error);
    }
  }
}
