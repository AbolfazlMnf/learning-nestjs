import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { uploadFileDto } from './blog/dtos/uploadFile.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { deleteImage, saveImage, saveImages } from './shared/utils/image';
import { DeleteFileDto, UploadFilesDto } from './shared/dtos/upload-files.dto';
import { ImagesPipe } from './shared/pipes/images.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post(`upload-file`)
  @UseInterceptors(FileInterceptor(`file`))
  @ApiConsumes(`multipart/form-data`)
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 20000000,
          }),
          new FileTypeValidator({
            fileType: /(image\/jpeg|image\/png|image\/jpg|image\/webp)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body: uploadFileDto,
  ) {
    const savedImage = await saveImage(file, body);
    return savedImage;
  }

  @Post(`upload-files`)
  @UseInterceptors(FilesInterceptor(`files`))
  @ApiConsumes(`multipart/form-data`)
  uploadFiles(
    @UploadedFiles(ImagesPipe) files: Array<Express.Multer.File>,
    @Body() body: UploadFilesDto,
  ) {
    return saveImages(files, body);
  }
  @Delete(`delete-file`)
  async delete(@Body() body: DeleteFileDto) {
    await deleteImage(body.fileName, body.folder);
    return `deleted`;
  }
}
