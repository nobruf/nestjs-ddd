import { Entity } from '@/shared/domain/entities/entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { {{ModuleNameMin}}ValidatorFactory } from '../validators/{{ModuleNameMin}}.validator';

export type {{ModuleNameMin}}Props = {
  createdAt?: Date;
};

export class {{ModuleNameMin}}Entity extends Entity<{{ModuleNameMin}}Props> {
  constructor(
     public readonly props: {{ModuleNameMin}}Props,
     id?: string,
    ) {
     {{ModuleNameMin}}Entity.validate(props);
     super(props, id);
     this.props.createdAt = this.props.createdAt ?? new Date();
  }

  update(props: Partial<{{ModuleNameMin}}Props>) {
    {{ModuleNameMin}}Entity.validate({ ...this.props, ...props });
    Object.assign(this.props, props);
  }

  static validate(props: {{ModuleNameMin}}Props) {
    const validator = {{ModuleNameMin}}ValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}

