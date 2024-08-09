import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { Create{{ModuleName}}UseCase } from '@/{{ModuleNameMin}}/application/use-cases/create-{{ModuleNameMin}}.use-case';
import { Update{{ModuleName}}UseCase } from '@/{{ModuleNameMin}}/application/use-cases/update-{{ModuleNameMin}}.use-case';
import { Get{{ModuleName}}UseCase } from '@/{{ModuleNameMin}}/application/use-cases/get-{{ModuleNameMin}}.use-case';
import { Delete{{ModuleName}}UseCase } from '@/{{ModuleNameMin}}/application/use-cases/delete-{{ModuleNameMin}}.use-case';
import { Create{{ModuleName}}Dto } from '@/{{ModuleNameMin}}/infrastructure/dtos/create-{{ModuleNameMin}}.dto';
import { Update{{ModuleName}}Dto } from '@/{{ModuleNameMin}}/infrastructure/dtos/update-{{ModuleNameMin}}.dto';

@Controller('{{ModuleNameMin}}')
export class {{ModuleName}}Controller {
    constructor(
      private readonly create{{ModuleName}}UseCase: Create{{ModuleName}}UseCase.UseCase,
      private readonly update{{ModuleName}}UseCase: Update{{ModuleName}}UseCase.UseCase,
      private readonly get{{ModuleName}}UseCase: Get{{ModuleName}}UseCase.UseCase,
      private readonly delete{{ModuleName}}UseCase: Delete{{ModuleName}}UseCase.UseCase,
    ) {}

    @Post()
    async create(
      @Body() body: Create{{ModuleName}}Dto,
    ): Promise<void> {
      await this.create{{ModuleName}}UseCase.execute(body);
    }

    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() body: Update{{ModuleName}}Dto,
    ): Promise<void> {
      await this.update{{ModuleName}}UseCase.execute({id, ...body});
    }

    @Get(':id')
    async get(
      @Param('id') id: string,
    ): Promise<void> {
      await this.get{{ModuleName}}UseCase.execute({id});
    }

    @Delete(':id')
    async delete(
      @Param('id') id: string,
    ): Promise<void> {
      await this.delete{{ModuleName}}UseCase.execute({id});
    }
}
