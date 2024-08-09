import { IUseCase } from '@/shared/application/usecases/use-case';
import { Injectable } from '@nestjs/common';
import { {{ModuleName}}Repository } from '@/{{ModuleNameMin}}/domain/repositories/{{ModuleNameMin}}.repository';

export namespace Get{{ModuleName}}UseCase {
  export type Input = {
    id: string;
  };

  export type Output = any;

  @Injectable()
  export class UseCase implements IUseCase<Input, Output> {
    constructor(private readonly {{ModuleNameMin}}Repository: {{ModuleName}}Repository) {}

    async execute(input: Input): Promise<Output> {
      const {{ModuleNameMin}} = await this.{{ModuleNameMin}}Repository.findById(input.id);
      return {{ModuleNameMin}}.toJSON();
    }
  }
}

