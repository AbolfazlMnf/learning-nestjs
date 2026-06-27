import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { uploadFileDto } from 'src/blog/dtos/uploadFile.dto';
import { UploadFilesDto } from '../dtos/upload-files.dto';

export const saveImage = async (
  file: Express.Multer.File,
  body: uploadFileDto,
): Promise<string> => {
  const destination = 'files/' + body.folder;

  const base = path.parse(file.originalname).name;
  const fileName = `${Date.now()}-${base}.webp`;

  const resizedDir = path.join(destination, 'resized');
  const mainDir = path.join(destination, 'main');

  const mainFilePath = path.join(mainDir, fileName);
  const resizedFilePath = path.join(resizedDir, fileName);

  fs.mkdirSync(resizedDir, { recursive: true });
  fs.mkdirSync(mainDir, { recursive: true });

  await sharp(file.buffer).webp().toFile(mainFilePath);
  await sharp(file.buffer)
    .webp()
    .resize({
      width: Number(body.width) || 200,
      height: Number(body.height) || 200,
    })
    .toFile(resizedFilePath);

  return resizedFilePath;
};

export const saveImages = async (
  files: Array<Express.Multer.File>,
  body: UploadFilesDto,
): Promise<Array<string>> => {
  const destination = 'files/' + body.folder;

  const resizedDir = path.join(destination, 'resized');
  const mainDir = path.join(destination, 'main');

  fs.mkdirSync(resizedDir, { recursive: true });
  fs.mkdirSync(mainDir, { recursive: true });

  const filesPath: string[] = [];

  for (const file of files) {
    const base = path.parse(file.originalname).name;
    const fileName = `${Date.now()}-${base}.webp`;

    const mainFilePath = path.join(mainDir, fileName);
    const resizedFilePath = path.join(resizedDir, fileName);

    await sharp(file.buffer).webp().toFile(mainFilePath);

    await sharp(file.buffer)
      .webp()
      .resize({
        width: Number(body.width) || 200,
        height: Number(body.height) || 200,
      })
      .toFile(resizedFilePath);

    filesPath.push(resizedFilePath);
  }

  return filesPath;
};

export const deleteImage = async (fileName: string, folder?: string) => {
  const basePath = path.join('files', folder ?? ``);
  const paths = [
    path.join(basePath, 'main', fileName),
    path.join(basePath, 'resized', fileName),
  ];
  for (const filePath of paths) {
    try {
      await fs.promises.unlink(filePath);
    } catch (err) {
      console.log(err);
    }
  }
};
