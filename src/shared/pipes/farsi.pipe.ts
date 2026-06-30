import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FarsiPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || typeof value !== 'object') {
      return value;
    }
    const items = [`firstName`, `lastName`];
    const farsi = /^[\u0600-\u06FF\s]{2,}$/;

    const errors: string[] = [];

    for (const key in value) {
      if (items.includes(key)) {
        const isFarsi = farsi.test(value[key]);
        if (!isFarsi) {
          errors.push(`${key} را فارسی وارد نمایید`);
        }
      }
    }
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return value;
  }
}
