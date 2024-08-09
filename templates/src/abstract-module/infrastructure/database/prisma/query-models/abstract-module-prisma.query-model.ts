import { {{ModuleName}}QueryModel } from '@/{{ModuleNameMin}}/domain/query-models/{{ModuleNameMin}}.query-model';
import { PrismaService } from '@/shared/infrastructure/database/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class {{ModuleName}}PrismaQueryModel implements {{ModuleName}}QueryModel {
  constructor(private readonly prisma: PrismaService) {}
}

