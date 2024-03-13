import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';
import { map } from 'rxjs';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getNews() {
    return this.newsService.getDaumSearchApi();
  }
}
