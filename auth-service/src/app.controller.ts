import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern('ping_auth')
  handlePing() {
    console.log('✅ Mensaje recibido desde Gateway');
    return { message: 'Auth service responde correctamente 🚀' };
  }
}
