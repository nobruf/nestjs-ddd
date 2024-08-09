import { IsString, IsNotEmpty, IsOptional} from 'class-validator';
import { Create{{ModuleName}}UseCase } from '@/{{ModuleNameMin}}/application/use-cases/create-{{ModuleNameMin}}.use-case';

export class Create{{ModuleName}}Dto implements Create{{ModuleName}}UseCase.Input {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  createdAt?: Date;
}

