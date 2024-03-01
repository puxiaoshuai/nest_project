import {
  Controller,
  Get,
  Header,
  HttpCode,
  Redirect,
  Query,
  Req
} from '@nestjs/common';
import { BookService } from './books.service';

@Controller()
export class BookController {
  constructor(private readonly appService: BookService) {}

  @Get('/hi')
  getHello(): object {
    return this.appService.getHello();
  }

  @Get('/json')
  @Header('Cache-Control', 'max-age=15')
  @HttpCode(200)
  getJson(): object {
    return this.appService.getJson();
  }
  @Get('ip')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version, @Req() req) {
    console.log('进入', req.ip);

    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    } else {
      return '测试';
    }
  }
}
