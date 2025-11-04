/* eslint-disable */            // desactiva todo el archivo
/* eslint-disable regla-x */    // archivo completo para una regla
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discipline } from './entities/discipline.entity';
import { CreateDisciplineDto } from './dto/create-discipline.dto';

@Injectable()
export class DisciplineService {
  private readonly logger = new Logger('DisciplineService');

  constructor(
    @InjectRepository(Discipline)
    private readonly disciplineRepository: Repository<Discipline>,
  ) {}

  async create(createDisciplineDto: CreateDisciplineDto) {
    try {
      const discipline = this.disciplineRepository.create(createDisciplineDto);
      return await this.disciplineRepository.save(discipline);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async assignDiscipline(daemonUserId: string, dto: CreateDisciplineDto) {
    try {
      const discipline = this.disciplineRepository.create({
        ...dto,
        daemonUserId,
      });
      return await this.disciplineRepository.save(discipline);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async getDisciplinesForDaemon(daemonUserId: string) {
    return this.disciplineRepository.find({
      where: { daemonUserId },
      order: { createdAt: 'DESC' },
    });
  }

  async findAll() {
    return this.disciplineRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: string) {
    const discipline = await this.disciplineRepository.findOneBy({ id });
    if (!discipline)
      throw new NotFoundException(`Discipline with id ${id} not found`);
    await this.disciplineRepository.remove(discipline);
    return { message: `Discipline with id ${id} removed successfully` };
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected database error');
  }
}
