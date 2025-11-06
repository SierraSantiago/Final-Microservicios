import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  Headers,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NATS_SERVICE } from 'src/config';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.client.send({ cmd: 'register' }, dto).pipe(
      catchError((err) => { throw new RpcException(err); }),
    );
  }

  // POST /auth/login  ->  MessagePattern('login')
  @Post('login')
  login(@Body() dto: LoginUserDto) {
    return this.client.send({ cmd: 'login' }, dto).pipe(
      catchError((err) => { throw new RpcException(err); }),
    );
  }

  // GET /auth  ->  MessagePattern('all')
  @Get()
  findAll() {
    return this.client.send({ cmd: 'all' }, {}).pipe(
      catchError((err) => { throw new RpcException(err); }),
    );
  }

  // GET /auth/:id  ->  MessagePattern('/:id') (tu micro usa un patrón raro; enviamos { id })
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4', optional: true })) id: string) {
    // Si tu id no es UUID, quita el ParseUUIDPipe
    return this.client.send({ cmd: '/:id' }, { id }).pipe(
      catchError((err) => { throw new RpcException(err); }),
    );
  }

  // PATCH /auth/:id  ->  MessagePattern(':id') (tu micro espera id + updateUserDto)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.client.send({ cmd: ':id' }, { id, updateUserDto: dto }).pipe(
      catchError((err) => { throw new RpcException(err); }),
    );
  }

  @Get('check-status')
  checkStatus(@Headers('authorization') authorization?: string) {
    return this.client.send(
      { cmd: 'check-status' },
      { authorization },           
    ).pipe(
      catchError((err) => { throw new RpcException(err); }),
    );
  }

  @Get('private')
  privateExample(@Headers() headers: Record<string, string | string[]>) {
    return this.client.send({ cmd: 'private' }, { headers }).pipe(
      catchError((err) => { throw new RpcException(err); }),
    );
  }

  // GET /auth/private2
  @Get('private2')
  privateExample2(@Headers() headers: Record<string, string | string[]>) {
    return this.client.send({ cmd: 'private2' }, { headers }).pipe(
      catchError((err) => { throw new RpcException(err); }),
    );
  }
}
