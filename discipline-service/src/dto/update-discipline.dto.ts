/* eslint-disable */            // desactiva todo el archivo
/* eslint-disable regla-x */    // archivo completo para una regla
import { PartialType } from '@nestjs/mapped-types';
import { CreateDisciplineDto } from './create-discipline.dto';

export class UpdateDisciplineDto extends PartialType(CreateDisciplineDto) {}
