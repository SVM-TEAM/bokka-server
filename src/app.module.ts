import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CqrsModule } from './public/cqrs/cqrs.module';

@Module({
  imports: [
    NewsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    CqrsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
