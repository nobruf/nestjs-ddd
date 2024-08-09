import { Entity } from '@/shared/domain/entities/entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';
import { {{ModuleName}}ValidatorFactory } from '../validators/{{ModuleNameMin}}.validator';

export type {{ModuleName}}Props = {
  createdAt?: Date;
};

export class {{ModuleName}}Entity extends Entity<{{ModuleName}}Props> {
  constructor(
     public readonly props: {{ModuleName}}Props,
     id?: string,
    ) {
     {{ModuleName}}Entity.validate(props);
     super(props, id);
     this.props.createdAt = this.props.createdAt ?? new Date();
  }

  update(props: Partial<{{ModuleName}}Props>) {
    {{ModuleName}}Entity.validate({ ...this.props, ...props });
    Object.assign(this.props, props);
  }

  static validate(props: {{ModuleName}}Props) {
    const validator = {{ModuleName}}ValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}

