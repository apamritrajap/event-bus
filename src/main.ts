import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.SERVER_PORT || 5300;
  const app = await NestFactory.create(AppModule);

  const microservice = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBIT_URL],
      queue: process.env.RABBIT_QUEUE,
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservicesAsync();

  await app.listen(port);
  console.log('bridge event bus listening on port : ', port);
}
bootstrap();
