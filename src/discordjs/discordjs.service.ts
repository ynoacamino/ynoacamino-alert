import { format } from '@formkit/tempo';
import { Injectable } from '@nestjs/common';
import { SendType } from './discordjs.entity';

@Injectable()
export class DiscordjsService {
  static CHANNEL_ID = '1273349865572929637';

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

  static async sendNotAvailableMessage() {
    await this.sendMessage(
      `⌛ - El talon de pago aun no esta disponible - ${DiscordjsService.dateFormated()}`,
      SendType.SILENT,
    );
  }

  static async sendTimeOutMessage() {
    await this.sendMessage(
      `❌ - La página tardó demasiado en responder - ${DiscordjsService.dateFormated()}`,
      SendType.SILENT,
    );
  }
}
