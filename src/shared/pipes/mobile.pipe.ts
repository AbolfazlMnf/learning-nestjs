import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { convertNumberEnglish } from '../utils/number';

@Injectable()
export class MobilePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value?.mobile) {
      const mobile = /^09\d{9}$/;
      const englishNumber = convertNumberEnglish(value.mobile);
      const isValidMobile = mobile.test(englishNumber);
      if (!isValidMobile) {
        throw new BadRequestException(`شماره مبایل را درست وارد کنید`);
      }
      return { ...value, mobile: englishNumber };
    }
    return value;
  }
}
