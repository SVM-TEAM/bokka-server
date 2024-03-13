import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NewsService {
  constructor(private readonly httpService: HttpService) {}
  async getNewsList() {
    const response = await axios.get(process.env.NAVER_SEARCH_API_URI, {
      headers: {
        'Content-Type': 'application/json',
        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
      },
      params: {
        query: '스프링부트',
      },
    });

    return response.data.items;
  }
  async getDaumSearchApi() {
    const url = `https://dapi.kakao.com/v2/search/web`;
    try {
      const { data } = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `KakaoAK ${process.env.DAUM_REST_KEY}`,
        },
        params: {
          query: '스프링부트',
          size: 50,
        },
      });

      return data?.documents;
    } catch (e) {
      console.error(e);
    }
  }
}
