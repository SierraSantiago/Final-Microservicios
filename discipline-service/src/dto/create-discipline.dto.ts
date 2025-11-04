/* eslint-disable */            // desactiva todo el archivo
/* eslint-disable regla-x */    // archivo completo para una regla
import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { DisciplineKind } from '../enum/kind.enum';

export class CreateDisciplineDto {
  @IsString()
  reason: string;

  @IsNumber()
  points: number;

  @IsEnum(DisciplineKind)
  kind: DisciplineKind;

  @IsUUID()
  daemonUserId: string;

  @IsUUID()
  issuedByUserId: string;
}
