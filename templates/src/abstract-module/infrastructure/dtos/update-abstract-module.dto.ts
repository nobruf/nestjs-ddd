import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Update{{ModuleName}}UseCase } from '@/{{ModuleNameMin}}/application/use-cases/update-{{ModuleNameMin}}.use-case';

export class Update{{ModuleName}}Dto implements Omit<Update{{ModuleName}}UseCase.Input, 'id'> {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  createdAt?: Date;
}

