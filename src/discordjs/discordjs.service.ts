import { format } from '@formkit/tempo';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { SendType } from './discordjs.entity';

@Injectable()
export class DiscordjsService implements OnModuleInit {
  private lastDateMessage: Date;

  static CHANNEL_ID = '1273349865572929637';

  static TIME_OUT = 1000 * 60 * 60 - 100;

  constructor() {
    this.lastDateMessage = new Date();
  }

  async onModuleInit() {
    this.lastDateMessage = new Date();
  }

  static async sendMessage(message: string, sendType: SendType) {
    console.log('Enviando un mensaje');

    const body = {
      message,
      sendType,
      channelId: this.CHANNEL_ID,
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
      `✅ - El talon de pago esta disponible @everyone - ${DiscordjsService.dateFormated()} - http://extranet.unsa.edu.pe/sisacad/talonpago_pregrado_b_nuevo/`,
      SendType.NORMAL,
    );
  }

  async bounceSendMessage(funcSendMessage: Promise<void>, time: number) {
    if (Date.now() - this.lastDateMessage.getTime() <= time) {
      return;
    }

    this.lastDateMessage = new Date();
    await funcSendMessage;
  }

  async sendNotAvailableMessage() {
    this.bounceSendMessage(
      DiscordjsService.sendMessage(
        `❌ - El talon de pago no esta disponible @everyone - ${DiscordjsService.dateFormated()}`,
        SendType.NORMAL,
      ),
      DiscordjsService.TIME_OUT,
    );
  }

  async sendTimeOutMessage() {
    this.bounceSendMessage(
      DiscordjsService.sendMessage(
        `❌ - La página tardó demasiado en responder - ${DiscordjsService.dateFormated()}`,
        SendType.SILENT,
      ),
      DiscordjsService.TIME_OUT,
    );
  }
}
