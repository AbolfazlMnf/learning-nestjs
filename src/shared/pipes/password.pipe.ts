import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PasswordPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (value?.password) {
      const pass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/;
      const isValidPassword = pass.test(value.password);
      if (!isValidPassword) {
        throw new BadRequestException(
          `پسورد باید حداقل شامل 8 کاراکتر و اعداد و حروف باشد`,
        );
      } else {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(value.password, salt);
        return { ...value, password: hashedPassword };
      }
    }
    return value;
  }
}
