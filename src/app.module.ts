import { Module } from "@nestjs/common";
import { QueryModule } from './query/query.module';
import { cronModule } from "./cron/cron.module";

@Module({
  imports: [QueryModule, cronModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
