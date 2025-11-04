/* eslint-disable */            // desactiva todo el archivo
/* eslint-disable regla-x */    // archivo completo para una regla
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DisciplineService } from './discipline.service';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';

@Controller()
export class DisciplineController {
  constructor(private readonly disciplineService: DisciplineService) {}

  @MessagePattern('create_discipline')
  create(@Payload() dto: CreateDisciplineDto) {
    return this.disciplineService.create(dto);
  }

  @MessagePattern('assign_discipline')
  assign(@Payload() data: { daemonUserId: string; dto: CreateDisciplineDto }) {
    return this.disciplineService.assignDiscipline(data.daemonUserId, data.dto);
  }

  @MessagePattern('get_disciplines_for_daemon')
  getForDaemon(@Payload() daemonUserId: string) {
    return this.disciplineService.getDisciplinesForDaemon(daemonUserId);
  }

  @MessagePattern('find_all_disciplines')
  findAll() {
    return this.disciplineService.findAll();
  }

  @MessagePattern('remove_discipline')
  remove(@Payload() id: string) {
    return this.disciplineService.remove(id);
  }
}
