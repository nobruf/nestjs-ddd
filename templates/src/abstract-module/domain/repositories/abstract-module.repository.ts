import { RepositoryInterface } from '@/shared/domain/repositories/repository-contracts';
import { {{ModuleName}}Entity } from '../entities/{{ModuleNameMin}}.entity';

export abstract class {{ModuleName}}Repository extends RepositoryInterface<{{ModuleName}}Entity> {}
