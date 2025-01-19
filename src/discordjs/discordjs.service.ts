import { format } from '@formkit/tempo';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { SendType } from './discordjs.entity';

@Injectable()
export class DiscordjsService implements OnModuleInit {
  private lastDateMessage: number;

  static CHANNEL_ID = '1273349865572929637';

  static TIME_OUT = 1000 * 60 * 60 - 100;

  constructor() {
    this.lastDateMessage = Date.now();
  }

  async onModuleInit() {
    this.lastDateMessage = Date.now();
  }

  static async sendMessage(message: string, sendType: SendType) {
    console.log('Enviando un mensaje');

    const body = {
      message,
      sendType,
      channelId: DiscordjsService.CHANNEL_ID,
    };

    try {
      await fetch('https://bot.ynoacamino.site/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  }

  static dateFormated() {
    return format({
      format: 'dddd, HH:mm',
      date: new Date(),
      locale: 'es',
      tz: 'America/Lima',
    });
  }

  static async sendAvailableMessage() {
    await this.sendMessage(
      `✅ - El talon de pago esta disponible @everyone - ${DiscordjsService.dateFormated()} - http://extranet.unsa.edu.pe/sisacad/talonpago_pregrado_a_nuevo/`,
      SendType.NORMAL,
    );
  }

  async bounceSendMessage(funcSendMessage: () => Promise<void>, time: number) {
    if (Date.now() - this.lastDateMessage <= time) {
      return;
    }

    this.lastDateMessage = Date.now();
    await funcSendMessage();
  }

  async sendNotAvailableMessage() {
    this.bounceSendMessage(
      async () => {
        DiscordjsService.sendMessage(
          `⌛ - El talon de pago aun no esta disponible - ${DiscordjsService.dateFormated()}`,
          SendType.SILENT,
        );
      },
      DiscordjsService.TIME_OUT,
    );
  }

  async sendTimeOutMessage() {
    this.bounceSendMessage(
      async () => {
        DiscordjsService.sendMessage(
          `❌ - La página tardó demasiado en responder - ${DiscordjsService.dateFormated()}`,
          SendType.SILENT,
        );
      },
      DiscordjsService.TIME_OUT,
    );
  }
}
