import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  @Get('ping')
  pingAuth() {
    console.log('📡 Enviando mensaje a Auth Service...');
    return this.client.send('ping_auth', {});
  }
}
