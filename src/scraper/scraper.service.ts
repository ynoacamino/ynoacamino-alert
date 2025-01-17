import { Injectable } from '@nestjs/common';
import { DiscordjsService } from 'src/discordjs/discordjs.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryStatus } from 'src/query/query.entity';

@Injectable()
export class ScraperService {
  private readonly PAGE_URL = 'http://extranet.unsa.edu.pe/sisacad/talonpago_pregrado_a_nuevo/';

  private readonly MATCH_WORD = 'sistemas';

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async scrape(): Promise<boolean> {
    let contentText: string | undefined;

    try {
      contentText = await fetch(this.PAGE_URL).then((response) => response.text());

      if (!contentText) {
        throw new Error('No se encontró el elemento');
      }

      contentText = contentText.toLowerCase();
      const i = contentText.indexOf('<select');
      const j = contentText.indexOf('</select>');

      contentText = contentText.slice(i, j);

      console.log(contentText);

      const match = contentText.includes(this.MATCH_WORD);

      if (!contentText) {
        throw new Error('No se encontró el elemento');
      }

      if (!match) {
        console.log('No match found', (new Date()).toLocaleString());
        this.prisma.query.create({
          data: {
            status: QueryStatus.NOT_AVAILABLE,
          },
        }).catch(console.error);

        DiscordjsService.sendNotAvailableMessage();

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

        DiscordjsService.sendTimeOutMessage();
      }
      return false;
    }

    return true;
  }
}
