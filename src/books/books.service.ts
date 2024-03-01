import { Injectable } from '@nestjs/common';
import { Cat } from './interface/cat.interface';
@Injectable()
export class BookService {
  private cats: Cat[] = [{ name: '张三1', age: 18 }];
  getHello(): object {
    return this.cats;
  }
  getJson(): object {
    return {
      name: '张三1',
      age: 18,
    };
  }
}
