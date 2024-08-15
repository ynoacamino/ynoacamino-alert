import { format } from '@formkit/tempo';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, Events } from 'discord.js';

@Injectable()
export class DiscordjsService extends Client implements OnModuleInit {
  private lastDateMessage: Date;

  constructor() {
    super({
      intents: 3276799,
    });

    this.on(Events.ClientReady, async () => {
      // const channel = this.channels.cache.get('1273457558962835582');
      // if (channel && channel.isTextBased()) {
      //   await channel.send('@everyone Bot iniciado');
      // }

      this.sendMessage('Bot iniciado', true);
    });

    this.lastDateMessage = new Date();
  }

  async onModuleInit() {
    this.login(process.env.DISCORD_TOKEN);
    this.lastDateMessage = new Date();
  }

  static dateFormated() {
    return format({
      format: 'dddd, HH:mm',
      date: new Date(),
      locale: 'es',
      tz: 'America/Lima',
    });
  }

  async sendMessage(msg: string, silent = false) {
    if (Date.now() - this.lastDateMessage.getTime() < 1000 * 60 * 5) {
      return;
    }

    this.lastDateMessage = new Date();

    const channel = this.channels.cache.get('1273349865572929637');
    if (channel && channel.isTextBased()) {
      await channel.send({
        content: msg,
        flags: silent ? [4096] : [],
      });
    } else {
      console.error('Channel not found');
    }
  }

  async sendAvailableMessage() {
    await this.sendMessage(`✅ - El talon de pago esta disponible @everyone - ${DiscordjsService.dateFormated()}`);
  }

  async sendNotAvailableMessage() {
    await this.sendMessage(`⌛ - El talon de pago aun no esta disponible - ${DiscordjsService.dateFormated()}`, true);
  }

  async sendTimeOutMessage() {
    await this.sendMessage(`❌ - La página tardó demasiado en responder - ${DiscordjsService.dateFormated()}`, true);
  }
}
