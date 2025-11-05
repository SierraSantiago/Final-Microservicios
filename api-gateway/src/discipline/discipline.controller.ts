/* eslint-disable */            // desactiva todo el archivo
/* eslint-disable regla-x */    // archivo completo para una regla

import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('discipline')
export class DisciplineController {
  @Client({
    transport: Transport.NATS,
    options: { servers: [process.env.NATS_URL!] },
  })
  client: ClientProxy;

  // Ping para probar conexión
  @Get('ping')
  async pingDiscipline() {
    console.log('Enviando mensaje a Discipline Service...');
    const response = await firstValueFrom(this.client.send('find_all_disciplines', {}));
    return {
      message: 'Respuesta del microservicio Discipline',
      data: response,
    };
  }

  // Obtener todas las disciplinas
  @Get()
  async findAll() {
    return await firstValueFrom(this.client.send('find_all_disciplines', {}));
  }

  // Crear una nueva disciplina
  @Post()
  async create(@Body() data: any) {
    return await firstValueFrom(this.client.send('create_discipline', data));
  }

  // Obtener todas las disciplinas de un usuario (daemon)
  @Get('daemon/:id')
  async getByDaemon(@Param('id') id: string) {
    return await firstValueFrom(
      this.client.send('get_disciplines_for_daemon', id),
    );
  }

  // Eliminar una disciplina
  @Post('delete/:id')
  async remove(@Param('id') id: string) {
    return await firstValueFrom(this.client.send('remove_discipline', id));
  }
}
