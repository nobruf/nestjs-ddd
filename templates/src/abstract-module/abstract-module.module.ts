import { Module } from '@nestjs/common';
import { {{ModuleName}}Controller } from './infrastructure/controllers/{{ModuleNameMin}}.controller';
import { Create{{ModuleName}}UseCase } from './application/use-cases/create-{{ModuleNameMin}}.use-case';
import { Update{{ModuleName}}UseCase } from './application/use-cases/update-{{ModuleNameMin}}.use-case';
import { Get{{ModuleName}}UseCase } from './application/use-cases/get-{{ModuleNameMin}}.use-case';
import { Delete{{ModuleName}}UseCase } from './application/use-cases/delete-{{ModuleNameMin}}.use-case';

@Module({
  controllers: [{{ModuleName}}Controller],
  providers: [
    Create{{ModuleName}}UseCase.UseCase,
    Update{{ModuleName}}UseCase.UseCase,
    Get{{ModuleName}}UseCase.UseCase,
    Delete{{ModuleName}}UseCase.UseCase,
  ],
})
export class {{ModuleName}}Module {}

