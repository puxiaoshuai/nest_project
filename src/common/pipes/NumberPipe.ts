import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

export class NumberPipe implements PipeTransform {
  constructor() {}

  transform(value: any, metadata: ArgumentMetadata) {
    const type = typeof +value;
    if (type === 'number' && !isNaN(+value)) {
      return +value;
    } else {
      throw new BadRequestException(`${value} must be a number`);
    }
  }
}
