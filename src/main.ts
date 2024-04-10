import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'gemini-api-client',
          brokers: ['host.docker.internal:9094'],
        },
        consumer: {
          groupId: 'gemini-consumer',
          allowAutoTopicCreation: true,
        },
      },
    },
  );
  await app
    .listen()
    .then(() => logger.log(`[GEMINI-ENGINE] is running`))
    .catch((err) => logger.log(err));
}
bootstrap();
