import { GoogleGenerativeAI } from '@google/generative-ai';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'node:fs';

@Injectable()
export class AppService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  private genAIProvisionModel: any;

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('API_KEY');
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    this.genAIProvisionModel = this.genAI.getGenerativeModel({
      model: 'gemini-pro-vision',
    });
  }

  async getPromptResponse(prompt: string): Promise<string> {
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text, 'TEXT DO SERVICE');

    return text;
  }

  async getPromptResponseWithImage(
    images: Express.Multer.File[],
    prompt: string,
  ): Promise<string> {
    const imageParts = [];

    for (const image of images) {
      imageParts.push(this.fileGenerativePart(image.path, image.mimetype));
    }

    const result = await this.genAIProvisionModel.generateContent([
      prompt,
      ...imageParts,
    ]);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
  }

  fileGenerativePart(path: string, mimeType: string) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString('base64'),
        mimeType,
      },
    };
  }
}
