import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUtils {
  editFileName(req: any, file: any, cb: any) {
    const originalName = file.originalname;
    cb(null, originalName);
  }

  validateImageFile(req: any, file: any, cb: any) {
    const originalName = file.originalname;
    if (!originalName.match(/\.(jpg|png|jpeg|gif)$/)) {
      return cb(new Error('Not an image file!'), false);
    }
    cb(null, true);
  }
}
