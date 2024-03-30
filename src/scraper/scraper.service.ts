import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryStatus } from 'src/query/query.entity';

@Injectable()
export class ScraperService {
  private readonly PAGE_URL = 'http://extranet.unsa.edu.pe/sisacad/talonpago_pregrado_a_nuevo/';

  private readonly MATCH_WORD = 'SISTEMAS';

  constructor(private readonly prisma: PrismaService) {}

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

      await window.close();
    } catch (error: any) {
      if (error.message !== 'No se encontró el elemento') {
        this.prisma.query.create({
          data: {
            status: QueryStatus.TIMEOUT,
          },
        }).catch(console.error);
      }
      return false;
    }

    const match = contentText.includes(this.MATCH_WORD);
    return match;
  }
}
