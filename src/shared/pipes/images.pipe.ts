import {
  ArgumentMetadata,
  BadRequestException,
  FileTypeValidator,
  Injectable,
  MaxFileSizeValidator,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ImagesPipe implements PipeTransform {
  async transform(files: Array<Express.Multer.File>) {
    const sizeValidator = new MaxFileSizeValidator({
      maxSize: 20000000,
    });

    const typeValidator = new FileTypeValidator({
      fileType: /(image\/jpeg|image\/png|image\/jpg|image\/webp)/,
    });

    for (const image of files) {
      if (!(await typeValidator.isValid(image))) {
        throw new BadRequestException(
          `${image.originalname} type is not acceptable `,
        );
      }
      if (!sizeValidator.isValid(image)) {
        throw new BadRequestException(`${image.originalname} is too large`);
      }
    }
    return files;
  }
}
