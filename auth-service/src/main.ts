import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.NATS,
    options: { servers: [process.env.NATS_URL] },
  });

  await app.listen();
  console.log('✅ Microservicio AUTH escuchando en NATS');
}
bootstrap();
