import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreatePromptDto } from './prompt.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('gemini')
  async getPromptResponse(@Body() body: CreatePromptDto): Promise<string> {
    return await this.appService.getPromptResponse(body.prompt);
  }

  @HttpCode(HttpStatus.OK)
  @Post('upload')
  @UseInterceptors(FilesInterceptor('images', 10))
  async getPromptResponseWithImage(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: CreatePromptDto,
  ) {
    return await this.appService.getPromptResponseWithImage(files, body.prompt);
  }
}
