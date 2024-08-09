import { ValidationError } from '@/shared/domain/errors/validation-error';
import { {{ModuleName}}Entity } from '@/{{ModuleNameMin}}/domain/entities/{{ModuleNameMin}}.entity';
import { {{ModuleName}} } from '@prisma/client';

export class {{ModuleName}}ModelMapper {
  static toEntity(model: {{ModuleName}}): {{ModuleName}}Entity {
    const data = {
      createdAt: model.createdAt,
    };

    try {
      return new {{ModuleName}}Entity(data, model.id);
    } catch {
      throw new ValidationError('An entity could not be loaded');
    }
  }
}

