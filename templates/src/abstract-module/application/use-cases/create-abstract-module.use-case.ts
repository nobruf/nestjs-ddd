import { IUseCase } from '@/shared/application/usecases/use-case';
import { Injectable } from '@nestjs/common';
import { {{ModuleName}}Repository } from '@/{{ModuleNameMin}}/domain/repositories/{{ModuleNameMin}}.repository';
import { {{ModuleName}}Entity } from '@/{{ModuleNameMin}}/domain/entities/{{ModuleNameMin}}.entity';

export namespace Create{{ModuleName}}UseCase {
  export type Input = {};

  export type Output = void;

  @Injectable()
  export class UseCase implements IUseCase<Input, Output> {
    constructor(private readonly {{ModuleNameMin}}Repository: {{ModuleName}}Repository) {}

    async execute(input: Input): Promise<Output> {
       const {{ModuleNameMin}} = new {{ModuleName}}Entity(input);
       await this.{{ModuleNameMin}}Repository.insert({{ModuleNameMin}});
    }
  }
}

