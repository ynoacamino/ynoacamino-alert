import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { DiscordjsService } from 'src/discordjs/discordjs.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryStatus } from 'src/query/query.entity';

@Injectable()
export class ScraperService {
  private readonly PAGE_URL = 'http://extranet.unsa.edu.pe/sisacad/talonpago_pregrado_b_nuevo/';

  private readonly MATCH_WORD = 'SISTEMAS';

  constructor(
    private readonly prisma: PrismaService,
    private readonly discordjs: DiscordjsService,
  ) {}

  async scrape(): Promise<boolean> {
    let contentText: string | undefined;

    try {
      const window = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await window.newPage();
      await page.goto(this.PAGE_URL);

      await page.waitForSelector('body');

      contentText = await page.evaluate(() => document.querySelector('select')?.innerText);

      if (!contentText) {
        throw new Error('No se encontró el elemento');
      }

      const match = contentText.includes(this.MATCH_WORD);
      if (!match) {
        console.log('No match found', (new Date()).toLocaleString());
        this.prisma.query.create({
          data: {
            status: QueryStatus.NOT_AVAILABLE,
          },
        }).catch(console.error);

        this.discordjs.sendNotAvailableMessage();

        return false;
      }

      await window.close();
    } catch (error: any) {
      if (error.message !== 'No se encontró el elemento') {
        this.prisma.query.create({
          data: {
            status: QueryStatus.TIMEOUT,
          },
        }).catch(console.error);

        this.discordjs.sendTimeOutMessage();
      }
      return false;
    }

    return true;
  }
}
