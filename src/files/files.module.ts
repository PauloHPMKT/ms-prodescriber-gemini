import { Module } from '@nestjs/common';
import { FileUtils } from './files.utils';

@Module({
  providers: [FileUtils],
  exports: [FileUtils],
})
export class FilesModule {}
