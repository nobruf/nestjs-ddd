import { {{ModuleName}}Entity } from '@/{{ModuleNameMin}}/domain/entities/{{ModuleNameMin}}.entity';
import { {{ModuleName}}Repository } from '@/{{ModuleNameMin}}/domain/repositories/{{ModuleNameMin}}.repository';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { {{ModuleName}}ModelMapper } from '../mappers/{{ModuleNameMin}}.model-mapper';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';

@Injectable()
export class {{ModuleName}}PrismaRepository implements {{ModuleName}}Repository {
  constructor(private readonly prisma: PrismaService) {}

  async insert(entity: {{ModuleName}}Entity): Promise<void | {{ModuleName}}Entity> {
    await this.prisma.{{ModuleNameMin}}.create({
      data: entity.toJSON(),
    });
  }

  async update(entity: {{ModuleName}}Entity): Promise<void | {{ModuleName}}Entity> {
    await this.prisma.{{ModuleNameMin}}.update({
      where: { id: entity.id },
      data: entity.toJSON(),
    });
  }

  async delete(id: string): Promise<void> {
    await this._get(id);
    await this.prisma.{{ModuleNameMin}}.delete({ where: { id } });
  }

  async findById(id: string): Promise<{{ModuleName}}Entity> {
    return this._get(id);
  }

  async findAll(): Promise<{{ModuleName}}Entity[]> {
    const {{ModuleNameMin}}s = await this.prisma.{{ModuleNameMin}}.findMany();
    return {{ModuleNameMin}}s.map({{ModuleName}}ModelMapper.toEntity);
  }

  protected async _get(id: string): Promise<{{ModuleName}}Entity> {
    try {
      const {{ModuleNameMin}} = await this.prisma.{{ModuleNameMin}}.findUnique({
        where: { id },
      });
      return {{ModuleName}}ModelMapper.toEntity({{ModuleNameMin}});
    } catch {
      throw new NotFoundError();
    }
  }
}

