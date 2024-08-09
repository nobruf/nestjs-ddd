import {

  IsOptional,
} from 'class-validator';
import { {{ModuleName}}Props } from '../entities/{{ModuleNameMin}}.entity';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';

export class {{ModuleName}}Rules {
  @IsOptional()
  createdAt?: Date;

  constructor({
    createdAt,
  }: {{ModuleName}}Props) {
    Object.assign(this, {
      createdAt,
    });
  }
}

export class {{ModuleName}}Validator extends ClassValidatorFields<{{ModuleName}}Rules> {
  validate(data: {{ModuleName}}Props): boolean {
    return super.validate(new {{ModuleName}}Rules(data ?? ({} as {{ModuleName}}Props)));
  }
}

export class {{ModuleName}}ValidatorFactory {
  static create(): {{ModuleName}}Validator {
    return new {{ModuleName}}Validator();
  }
}

