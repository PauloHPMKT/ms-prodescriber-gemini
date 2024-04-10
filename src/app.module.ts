import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUtils } from './files/files.utils';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MulterModule.registerAsync({
      imports: [FilesModule],
      useFactory: (fileUtils: FileUtils) => ({
        fileFilter: fileUtils.validateImageFile,
        storage: diskStorage({
          destination: 'uploads',
          filename: fileUtils.editFileName,
        }),
      }),
      inject: [FileUtils],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
