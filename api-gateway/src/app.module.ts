import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.NATS,
        options: { servers: process.env.NATS_URL },
      },
      {
        name: 'DISCIPLINE_SERVICE',
        transport: Transport.NATS,
        options: { servers: process.env.NATS_URL },
      },
      {
        name: 'REPORT_SERVICE',
        transport: Transport.NATS,
        options: { servers: process.env.NATS_URL },
      },
      {
        name: 'VICTIM_SERVICE',
        transport: Transport.NATS,
        options: { servers: process.env.NATS_URL },
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
