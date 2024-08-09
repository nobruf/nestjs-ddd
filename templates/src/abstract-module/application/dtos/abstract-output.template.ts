import { {{ModuleName}}Entity } from '@/{{ModuleNameMin}}/domain/entities/{{ModuleNameMin}}.entity';

export type {{ModuleName}}Output = {
  // Add your output type here
};

export class {{ModuleName}}OutputMapper {
  static toOutput(entity: {{ModuleName}}Entity): {{ModuleName}}Output {
    return entity.toJSON();
  }
}
