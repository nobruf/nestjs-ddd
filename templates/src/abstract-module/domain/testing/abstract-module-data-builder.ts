import { {{ModuleName}}Props } from '../entities/{{ModuleNameMin}}.entity';
type Props = {
  createdAt?: Date;
};

export function {{ModuleName}}DataBuilder(props: Props = {}): {{ModuleName}}Props {
  return {
    createdAt: props.createdAt ?? new Date(),
  };
}

