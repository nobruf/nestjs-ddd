#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const yargs = require("yargs");

// Function to capitalize the first letter of a string
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Adjusted function to get template content, now directly mapping file types to template files
const getTemplateContent = (filePath, moduleName) => {
  const templateMap = {
    [`src/${moduleName}/application/dtos/${moduleName}-output.ts`]:
      "src/abstract-module/application/dtos/abstract-output.template.ts",
    [`src/${moduleName}/application/dtos/__tests__/unit/${moduleName}-output.spec.ts`]:
      "src/abstract-module/application/dtos/__tests__/unit/abstract-module-output.spec.template.ts",
    ["README.md"]: "readme.template.md",
    ["tsconfig.json"]: "tsconfig.template.json",
    ["tsconfig.build.json"]: "tsconfig.build.template.json",
    ["package.json"]: "package.template.json",
    ["nest-cli.json"]: "nest-cli.template.json",
    ["jest.config.ts"]: "jest.config.template.ts",
    ["jest.unit.config.ts"]: "jest.unit.config.template.ts",
    ["jest.int.config.ts"]: "jest.int.config.template.ts",
    ["jest.e2e.config.ts"]: "jest.e2e.config.template.ts",
    [".env.development"]: ".env.development.template",
    [".env.test"]: ".env.test.template",
    [".prettierrc"]: ".prettierrc.template",
    [".gitignore"]: ".gitignore.template",
    [".eslintrc.js"]: ".eslintrc.template.js",
    ["src/main.ts"]: "src/main.template.ts",
    ["src/app.module.ts"]: "src/app.module.template.ts",
    ["src/global-config.ts"]: "src/global-config.template.ts",
    ["src/auth/infrastructure/auth.module.ts"]:
      "src/auth/infrastructure/auth.module.template.ts",
    ["src/auth/infrastructure/auth.service.ts"]:
      "src/auth/infrastructure/auth.service.template.ts",
    ["src/auth/infrastructure/auth.guard.ts"]:
      "src/auth/infrastructure/auth.guard.template.ts",
    ["src/auth/infrastructure/__tests__/unit/auth.service.spec.ts"]:
      "src/auth/infrastructure/__tests__/unit/auth.service.spec.template.ts",
    ["src/shared/application/dtos/search-input.ts"]:
      "src/shared/application/dtos/search-input.template.ts",
    ["src/shared/application/dtos/pagination-output.ts"]:
      "src/shared/application/dtos/pagination-output.template.ts",
    ["src/shared/application/dtos/__tests__/unit/pagination-output.spec.ts"]:
      "src/shared/application/dtos/__tests__/unit/pagination-output.spec.template.ts",
    ["src/shared/application/errors/bad-request-error.ts"]:
      "src/shared/application/errors/bad-request-error.template.ts",
    ["src/shared/application/errors/invalid-password-error.ts"]:
      "src/shared/application/errors/invalid-password-error.template.ts",
    ["src/shared/application/errors/invalid-credentials-error.ts"]:
      "src/shared/application/errors/invalid-credentials-error.template.ts",
    ["src/shared/application/providers/hash-provider.ts"]:
      "src/shared/application/providers/hash-provider.template.ts",
    ["src/shared/application/usecases/use-case.ts"]:
      "src/shared/application/usecases/use-case.template.ts",
    ["src/shared/domain/entities/entity.ts"]:
      "src/shared/domain/entities/entity.template.ts",
    ["src/shared/domain/entities/__tests__/unit/entity.spec.ts"]:
      "src/shared/domain/entities/__tests__/unit/entity.spec.template.ts",
    ["src/shared/domain/errors/conflict-error.ts"]:
      "src/shared/domain/errors/conflict-error.template.ts",
    ["src/shared/domain/errors/not-found-error.ts"]:
      "src/shared/domain/errors/not-found-error.template.ts",
    ["src/shared/domain/errors/validation-error.ts"]:
      "src/shared/domain/errors/validation-error.template.ts",
    ["src/shared/domain/repositories/in-memory-searchable.repository.ts"]:
      "src/shared/domain/repositories/in-memory-searchable.repository.template.ts",
    ["src/shared/domain/repositories/searchable-repository-contracts.ts"]:
      "src/shared/domain/repositories/searchable-repository-contracts.template.ts",
    ["src/shared/domain/repositories/in-memory.repository.ts"]:
      "src/shared/domain/repositories/in-memory.repository.template.ts",
    ["src/shared/domain/repositories/repository-contracts.ts"]:
      "src/shared/domain/repositories/repository-contracts.template.ts",
    ["src/shared/domain/repositories/__tests__/unit/in-memory.repository.spec.ts"]:
      "src/shared/domain/repositories/__tests__/unit/in-memory.repository.spec.template.ts",
    ["src/shared/domain/repositories/__tests__/unit/in-memory-searchable.repository.spec.ts"]:
      "src/shared/domain/repositories/__tests__/unit/in-memory-searchable.repository.spec.template.ts",
    ["src/shared/domain/repositories/__tests__/unit/in-memory.repository.spec.ts"]:
      "src/shared/domain/repositories/__tests__/unit/in-memory.repository.spec.template.ts",
    ["src/shared/domain/repositories/__tests__/unit/searchable-repository-contracts.spec.ts"]:
      "src/shared/domain/repositories/__tests__/unit/searchable-repository-contracts.spec.template.ts",
    ["src/shared/domain/validators/validator-fields.interface.ts"]:
      "src/shared/domain/validators/validator-fields.interface.template.ts",
    ["src/shared/domain/validators/class-validator-fields.ts"]:
      "src/shared/domain/validators/class-validator-fields.template.ts",
    ["src/shared/domain/validators/__tests__/integration/class-validator-fields.int-spec.ts"]:
      "src/shared/domain/validators/__tests__/integration/class-validator-fields.int-spec.template.ts",
    ["src/shared/domain/validators/__tests__/unity/class-validator-fields.spec.ts"]:
      "src/shared/domain/validators/__tests__/unity/class-validator-fields.spec.template.ts",
    ["src/shared/infrastructure/database/database.module.ts"]:
      "src/shared/infrastructure/database/database.module.template.ts",
    ["src/shared/infrastructure/database/prisma/prisma.service.ts"]:
      "src/shared/infrastructure/database/prisma/prisma.service.template.ts",
    ["src/shared/infrastructure/database/prisma/prisma.service.spec.ts"]:
      "src/shared/infrastructure/database/prisma/prisma.service.spec.template.ts",
    ["prisma/schema.prisma"]: "prisma/schema.template.prisma",
    ["src/shared/infrastructure/database/prisma/migrations/20240529142903_init/migration.sql"]:
      "src/shared/infrastructure/database/prisma/migrations/20240529142903_init/migration.template.sql",
    ["src/shared/infrastructure/database/prisma/migrations/migration_lock.toml"]:
      "src/shared/infrastructure/database/prisma/migrations/migration_lock.template.toml",
    ["src/shared/infrastructure/database/prisma/testing/setup-prisma.tests.ts"]:
      "src/shared/infrastructure/database/prisma/testing/setup-prisma.tests.template.ts",
    ["src/shared/infrastructure/env-config/env-config.module.ts"]:
      "src/shared/infrastructure/env-config/env-config.module.template.ts",
    ["src/shared/infrastructure/env-config/env-config.service.ts"]:
      "src/shared/infrastructure/env-config/env-config.service.template.ts",
    ["src/shared/infrastructure/env-config/env-config.interface.ts"]:
      "src/shared/infrastructure/env-config/env-config.interface.template.ts",
    ["src/shared/infrastructure/env-config/__tests__/unit/env-config.service.spec.ts"]:
      "src/shared/infrastructure/env-config/__tests__/unit/env-config.service.spec.template.ts",
    ["src/shared/infrastructure/exception-filters/conflict-error/conflict-error.filter.ts"]:
      "src/shared/infrastructure/exception-filters/conflict-error/conflict-error.filter.template.ts",
    ["src/shared/infrastructure/exception-filters/conflict-error/__tests__/e2e/conflict-error.filter.spec.ts"]:
      "src/shared/infrastructure/exception-filters/conflict-error/__tests__/e2e/conflict-error.filter.spec.template.ts",
    ["src/shared/infrastructure/exception-filters/invalid-credentials-error/invalid-credentials-error.filter.ts"]:
      "src/shared/infrastructure/exception-filters/invalid-credentials-error/invalid-credentials-error.filter.template.ts",
    ["src/shared/infrastructure/exception-filters/invalid-credentials-error/__tests__/e2e/invalid-credentials-error.filter.e2e-spec.ts"]:
      "src/shared/infrastructure/exception-filters/invalid-credentials-error/__tests__/e2e/invalid-credentials-error.filter.e2e-spec.template.ts",
    ["src/shared/infrastructure/exception-filters/invalid-password-error/invalid-password-error.filter.ts"]:
      "src/shared/infrastructure/exception-filters/invalid-password-error/invalid-password-error.filter.template.ts",
    ["src/shared/infrastructure/exception-filters/invalid-password-error/__tests__/e2e/invalid-password-error.filter.e2e-spec.ts"]:
      "src/shared/infrastructure/exception-filters/invalid-password-error/__tests__/e2e/invalid-password-error.filter.e2e-spec.template.ts",
    ["src/shared/infrastructure/exception-filters/not-found-error/not-found-error.filter.ts"]:
      "src/shared/infrastructure/exception-filters/not-found-error/not-found-error.filter.template.ts",
    ["src/shared/infrastructure/exception-filters/not-found-error/__tests__/e2e/not-found-error.filter.e2e-spec.ts"]:
      "src/shared/infrastructure/exception-filters/not-found-error/__tests__/e2e/not-found-error.filter.e2e-spec.template.ts",
    ["src/shared/infrastructure/interceptors/wrapper-data/wrapper-data.interceptor.ts"]:
      "src/shared/infrastructure/interceptors/wrapper-data/wrapper-data.interceptor.template.ts",
    ["src/shared/infrastructure/interceptors/wrapper-data/__tests__/unit/wrapper-data.interceptor.spec.ts"]:
      "src/shared/infrastructure/interceptors/wrapper-data/__tests__/unit/wrapper-data.interceptor.spec.template.ts",
    ["src/shared/infrastructure/presenters/collection.presenter.ts"]:
      "src/shared/infrastructure/presenters/collection.presenter.template.ts",
    ["src/shared/infrastructure/presenters/pagination.presenter.ts"]:
      "src/shared/infrastructure/presenters/pagination.presenter.template.ts",
    ["src/shared/infrastructure/presenters/__tests__/unit/collection.presenter.spec.ts"]:
      "src/shared/infrastructure/presenters/__tests__/unit/collection.presenter.spec.template.ts",
    ["src/shared/infrastructure/presenters/__tests__/unit/pagination.presenter.spec.ts"]:
      "src/shared/infrastructure/presenters/__tests__/unit/pagination.presenter.spec.template.ts",
    ["src/users/application/dtos/user-output.ts"]:
      "src/users/application/dtos/user-output.template.ts",
    ["src/users/application/dtos/__tests__/unit/user-output.spec.ts"]:
      "src/users/application/dtos/__tests__/unit/user-output.spec.template.ts",
    ["src/users/application/usecases/list-users.usecase.ts"]:
      "src/users/application/usecases/list-users.usecase.template.ts",
    ["src/users/application/usecases/delete-user.usecase.ts"]:
      "src/users/application/usecases/delete-user.usecase.template.ts",
    ["src/users/application/usecases/get-user.usecase.ts"]:
      "src/users/application/usecases/get-user.usecase.template.ts",
    ["src/users/application/usecases/update-user.usecase.ts"]:
      "src/users/application/usecases/update-user.usecase.template.ts",
    ["src/users/application/usecases/signin.usecase.ts"]:
      "src/users/application/usecases/signin.usecase.template.ts",
    ["src/users/application/usecases/signup.usecase.ts"]:
      "src/users/application/usecases/signup.usecase.template.ts",
    ["src/users/application/usecases/update-password.usecase.ts"]:
      "src/users/application/usecases/update-password.usecase.template.ts",
    ["src/users/application/usecases/__tests__/unit/list-users.usecase.spec.ts"]:
      "src/users/application/usecases/__tests__/unit/list-users.usecase.spec.template.ts",
    ["src/users/application/usecases/__tests__/unit/delete-user.usecase.spec.ts"]:
      "src/users/application/usecases/__tests__/unit/delete-user.usecase.spec.template.ts",
    ["src/users/application/usecases/__tests__/unit/get-user.usecase.spec.ts"]:
      "src/users/application/usecases/__tests__/unit/get-user.usecase.spec.template.ts",
    ["src/users/application/usecases/__tests__/unit/update-user.usecase.spec.ts"]:
      "src/users/application/usecases/__tests__/unit/update-user.usecase.spec.template.ts",
    ["src/users/application/usecases/__tests__/unit/signin.usecase.spec.ts"]:
      "src/users/application/usecases/__tests__/unit/signin.usecase.spec.template.ts",
    ["src/users/application/usecases/__tests__/unit/signup.usecase.spec.ts"]:
      "src/users/application/usecases/__tests__/unit/signup.usecase.spec.template.ts",
    ["src/users/application/usecases/__tests__/unit/update-password.usecase.spec.ts"]:
      "src/users/application/usecases/__tests__/unit/update-password.usecase.spec.template.ts",
    ["src/users/application/usecases/__tests__/integration/list-users.usecase.int-spec.ts"]:
      "src/users/application/usecases/__tests__/integration/list-users.usecase.int-spec.template.ts",
    ["src/users/application/usecases/__tests__/integration/delete-user.usecase.int-spec.ts"]:
      "src/users/application/usecases/__tests__/integration/delete-user.usecase.int-spec.template.ts",
    ["src/users/application/usecases/__tests__/integration/get-user.usecase.int-spec.ts"]:
      "src/users/application/usecases/__tests__/integration/get-user.usecase.int-spec.template.ts",
    ["src/users/application/usecases/__tests__/integration/update-user.usecase.int-spec.ts"]:
      "src/users/application/usecases/__tests__/integration/update-user.usecase.int-spec.template.ts",
    ["src/users/application/usecases/__tests__/integration/signin.usecase.int-spec.ts"]:
      "src/users/application/usecases/__tests__/integration/signin.usecase.int-spec.template.ts",
    ["src/users/application/usecases/__tests__/integration/signup.usecase.int-spec.ts"]:
      "src/users/application/usecases/__tests__/integration/signup.usecase.int-spec.template.ts",
    ["src/users/application/usecases/__tests__/integration/update-password.usecase.int-spec.ts"]:
      "src/users/application/usecases/__tests__/integration/update-password.usecase.int-spec.template.ts",
    ["src/users/domain/entities/user.entity.ts"]:
      "src/users/domain/entities/user.entity.template.ts",
    ["src/users/domain/entities/__tests__/unit/user.entity.spec.ts"]:
      "src/users/domain/entities/__tests__/unit/user.entity.spec.template.ts",
    ["src/users/domain/entities/__tests__/integration/user.entity.int-spec.ts"]:
      "src/users/domain/entities/__tests__/integration/user.entity.int-spec.template.ts",
    ["src/users/domain/repositories/user.repository.ts"]:
      "src/users/domain/repositories/user.repository.template.ts",
    ["src/users/domain/testing/helpers/user-data-builder.ts"]:
      "src/users/domain/testing/helpers/user-data-builder.template.ts",
    ["src/users/domain/validators/user.validator.ts"]:
      "src/users/domain/validators/user.validator.template.ts",
    ["src/users/domain/validators/__tests__/unit/user.validator.spec.ts"]:
      "src/users/domain/validators/__tests__/unit/user.validator.spec.template.ts",
    ["src/users/infrastructure/__tests__/unit/users.controller.spec.ts"]:
      "src/users/infrastructure/__tests__/unit/users.controller.spec.template.ts",
    ["src/users/infrastructure/__tests__/e2e/create.e2e-spec.ts"]:
      "src/users/infrastructure/__tests__/e2e/create.e2e-spec.template.ts",
    ["src/users/infrastructure/__tests__/e2e/update.e2e-spec.ts"]:
      "src/users/infrastructure/__tests__/e2e/update.e2e-spec.template.ts",
    ["src/users/infrastructure/__tests__/e2e/search.e2e-spec.ts"]:
      "src/users/infrastructure/__tests__/e2e/search.e2e-spec.template.ts",
    ["src/users/infrastructure/__tests__/e2e/remove.e2e-spec.ts"]:
      "src/users/infrastructure/__tests__/e2e/remove.e2e-spec.template.ts",
    ["src/users/infrastructure/__tests__/e2e/find-one.e2e-spec.ts"]:
      "src/users/infrastructure/__tests__/e2e/find-one.e2e-spec.template.ts",
    ["src/users/infrastructure/__tests__/e2e/login.e2e-spec.ts"]:
      "src/users/infrastructure/__tests__/e2e/login.e2e-spec.template.ts",
    ["src/users/infrastructure/__tests__/e2e/update-password.e2e-spec.ts"]:
      "src/users/infrastructure/__tests__/e2e/update-password.e2e-spec.template.ts",
    ["src/users/infrastructure/database/in-memory/repositories/__tests__/unit/user-in-memory.repository.spec.ts"]:
      "src/users/infrastructure/database/in-memory/repositories/__tests__/unit/user-in-memory.repository.spec.template.ts",
    ["src/users/infrastructure/database/in-memory/repositories/user-in-memory.repository.ts"]:
      "src/users/infrastructure/database/in-memory/repositories/user-in-memory.repository.template.ts",
    ["src/users/infrastructure/database/prisma/models/__tests__/integration/user-model.mapper.int-spec.ts"]:
      "src/users/infrastructure/database/prisma/models/__tests__/integration/user-model.mapper.int-spec.template.ts",
    ["src/users/infrastructure/database/prisma/models/user-model.mapper.ts"]:
      "src/users/infrastructure/database/prisma/models/user-model.mapper.template.ts",
    ["src/users/infrastructure/database/prisma/repositories/__tests__/integration/user-prisma.repository.int-spec.ts"]:
      "src/users/infrastructure/database/prisma/repositories/__tests__/integration/user-prisma.repository.int-spec.template.ts",
    ["src/users/infrastructure/database/prisma/repositories/user-prisma.repository.ts"]:
      "src/users/infrastructure/database/prisma/repositories/user-prisma.repository.template.ts",
    ["src/users/infrastructure/dtos/list-users.dto.ts"]:
      "src/users/infrastructure/dtos/list-users.dto.template.ts",
    ["src/users/infrastructure/dtos/signin.dto.ts"]:
      "src/users/infrastructure/dtos/signin.dto.template.ts",
    ["src/users/infrastructure/dtos/signup.dto.ts"]:
      "src/users/infrastructure/dtos/signup.dto.template.ts",
    ["src/users/infrastructure/dtos/update-password.dto.ts"]:
      "src/users/infrastructure/dtos/update-password.dto.template.ts",
    ["src/users/infrastructure/dtos/update-user.dto.ts"]:
      "src/users/infrastructure/dtos/update-user.dto.template.ts",
    ["src/users/infrastructure/presenters/__tests__/unit/user.presenter.spec.ts"]:
      "src/users/infrastructure/presenters/__tests__/unit/user.presenter.spec.template.ts",
    ["src/users/infrastructure/presenters/user.presenter.ts"]:
      "src/users/infrastructure/presenters/user.presenter.template.ts",
    ["src/users/infrastructure/providers/hash-provider/__tests__/unit/bcrypt-hash.provider.spec.ts"]:
      "src/users/infrastructure/providers/hash-provider/__tests__/unit/bcrypt-hash.provider.spec.template.ts",
    ["src/users/infrastructure/providers/hash-provider/bcrypt-hash.provider.ts"]:
      "src/users/infrastructure/providers/hash-provider/bcrypt-hash.provider.template.ts",
    ["src/users/infrastructure/users.controller.ts"]:
      "src/users/infrastructure/users.controller.template.ts",
    ["src/users/infrastructure/users.module.ts"]:
      "src/users/infrastructure/users.module.template.ts",
  };

  // Find the template file based on the given file path
  const templateFile = Object.keys(templateMap).find((key) =>
    filePath.endsWith(key)
  );
  if (templateFile) {
    const templatePath = path.join(
      __dirname,
      "templates",
      templateMap[templateFile]
    );
    if (fs.existsSync(templatePath)) {
      let templateContent = fs.readFileSync(templatePath, "utf8");
      templateContent = templateContent
        .replace(/\{\{ModuleName\}\}/g, capitalizeFirstLetter(moduleName))
        .replace(/\{\{ModuleNameMin\}\}/g, moduleName.toLowerCase());
      return templateContent;
    } else {
      console.error(`Template file not found: ${templatePath}`);
      return "// Template file not found\n";
    }
  }
  console.error(`No template mapping found for: ${filePath}`);
  return "// Template not found\n";
};

// Create files with template content
const createFiles = (basePath, files, moduleName, isModule = false) => {
  files.forEach((file) => {
    const filePath = path.join(basePath, file);
    const fileDir = path.dirname(isModule ? file : filePath);

    // Ensure the directory exists before writing the file
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }

    if (!fs.existsSync(isModule ? file : filePath)) {
      const content = getTemplateContent(file, moduleName);
      fs.writeFileSync(isModule ? file : filePath, content);
    } else if (!fs.existsSync(isModule ? file : filePath)) {
      fs.writeFileSync(
        isModule ? file : filePath,
        "// Replace with your own content\n"
      );
    }
  });
};

// Generate the structure based on module name and target directory
const generateStructure = (moduleName) => {
  const basePath = path.join(moduleName);

  // // Define directories and files to be created
  // const dirs = [
  //   "domain",
  //   "dto",
  //   "infrastructure/persistence/document/entities",
  //   "infrastructure/persistence/document/mappers",
  //   "infrastructure/persistence/document/repository",
  // ];

  const files = [
    `src/${moduleName}/application/dtos/${moduleName}-output.ts`,
    `src/${moduleName}/application/dtos/__tests__/unit/${moduleName}-output.spec.ts`,
  ];

  // Create directories and files
  // createDirectories(basePath, dirs);
  createFiles(basePath, files, moduleName, true);
};

// Generate default files (to be implemented)
const generateDefaultFiles = (basePath) => {
  // Define default files to be created
  const defaultFiles = [
    "README.md",
    "tsconfig.json",
    "tsconfig.build.json",
    "package.json",
    "nest-cli.json",
    "jest.config.ts",
    "jest.e2e.config.ts",
    "jest.int.config.ts",
    "jest.unit.config.ts",
    ".prettierrc",
    ".gitignore",
    ".eslintrc.js",
    ".env.test",
    ".env.development",
    "src/main.ts",
    "src/app.module.ts",
    "src/global-config.ts",
    "src/auth/infrastructure/auth.module.ts",
    "src/auth/infrastructure/auth.service.ts",
    "src/auth/infrastructure/auth.guard.ts",
    "src/auth/infrastructure/__tests__/unit/auth.service.spec.ts",
    "src/shared/application/dtos/search-input.ts",
    "src/shared/application/dtos/pagination-output.ts",
    "src/shared/application/dtos/__tests__/unit/pagination-output.spec.ts",
    "src/shared/application/errors/bad-request-error.ts",
    "src/shared/application/errors/invalid-credentials-error.ts",
    "src/shared/application/errors/invalid-password-error.ts",
    "src/shared/application/providers/hash-provider.ts",
    "src/shared/application/usecases/use-case.ts",
    "src/shared/domain/entities/entity.ts",
    "src/shared/domain/entities/__tests__/unit/entity.spec.ts",
    "src/shared/domain/errors/conflict-error.ts",
    "src/shared/domain/errors/not-found-error.ts",
    "src/shared/domain/errors/validation-error.ts",
    "src/shared/domain/repositories/in-memory-searchable.repository.ts",
    "src/shared/domain/repositories/searchable-repository-contracts.ts",
    "src/shared/domain/repositories/in-memory.repository.ts",
    "src/shared/domain/repositories/repository-contracts.ts",
    "src/shared/domain/repositories/__tests__/unit/in-memory.repository.spec.ts",
    "src/shared/domain/repositories/__tests__/unit/in-memory-searchable.repository.spec.ts",
    "src/shared/domain/repositories/__tests__/unit/in-memory.repository.spec.ts",
    "src/shared/domain/repositories/__tests__/unit/searchable-repository-contracts.spec.ts",
    "src/shared/domain/validators/validator-fields.interface.ts",
    "src/shared/domain/validators/class-validator-fields.ts",
    "src/shared/domain/validators/__tests__/integration/class-validator-fields.int-spec.ts",
    "src/shared/domain/validators/__tests__/unity/class-validator-fields.spec.ts",
    "src/shared/infrastructure/database/database.module.ts",
    "src/shared/infrastructure/database/prisma/prisma.service.ts",
    "src/shared/infrastructure/database/prisma/prisma.service.spec.ts",
    "prisma/schema.prisma",
    "src/shared/infrastructure/database/prisma/migrations/20240529142903_init/migration.sql",
    "src/shared/infrastructure/database/prisma/migrations/migration_lock.toml",
    "src/shared/infrastructure/database/prisma/testing/setup-prisma.tests.ts",
    "src/shared/infrastructure/env-config/env-config.module.ts",
    "src/shared/infrastructure/env-config/env-config.service.ts",
    "src/shared/infrastructure/env-config/env-config.interface.ts",
    "src/shared/infrastructure/env-config/__tests__/unit/env-config.service.spec.ts",
    "src/shared/infrastructure/exception-filters/conflict-error/conflict-error.filter.ts",
    "src/shared/infrastructure/exception-filters/conflict-error/__tests__/e2e/conflict-error.filter.spec.ts",
    "src/shared/infrastructure/exception-filters/invalid-credentials-error/invalid-credentials-error.filter.ts",
    "src/shared/infrastructure/exception-filters/invalid-credentials-error/__tests__/e2e/invalid-credentials-error.filter.e2e-spec.ts",
    "src/shared/infrastructure/exception-filters/invalid-password-error/invalid-password-error.filter.ts",
    "src/shared/infrastructure/exception-filters/invalid-password-error/__tests__/e2e/invalid-password-error.filter.e2e-spec.ts",
    "src/shared/infrastructure/exception-filters/not-found-error/not-found-error.filter.ts",
    "src/shared/infrastructure/exception-filters/not-found-error/__tests__/e2e/not-found-error.filter.e2e-spec.ts",
    "src/shared/infrastructure/interceptors/wrapper-data/wrapper-data.interceptor.ts",
    "src/shared/infrastructure/interceptors/wrapper-data/__tests__/unit/wrapper-data.interceptor.spec.ts",
    "src/shared/infrastructure/presenters/collection.presenter.ts",
    "src/shared/infrastructure/presenters/pagination.presenter.ts",
    "src/shared/infrastructure/presenters/__tests__/unit/collection.presenter.spec.ts",
    "src/shared/infrastructure/presenters/__tests__/unit/pagination.presenter.spec.ts",
    "src/users/application/dtos/user-output.ts",
    "src/users/application/dtos/__tests__/unit/user-output.spec.ts",
    "src/users/application/usecases/list-users.usecase.ts",
    "src/users/application/usecases/delete-user.usecase.ts",
    "src/users/application/usecases/get-user.usecase.ts",
    "src/users/application/usecases/update-user.usecase.ts",
    "src/users/application/usecases/signin.usecase.ts",
    "src/users/application/usecases/signup.usecase.ts",
    "src/users/application/usecases/update-password.usecase.ts",
    "src/users/application/usecases/__tests__/unit/list-users.usecase.spec.ts",
    "src/users/application/usecases/__tests__/unit/delete-user.usecase.spec.ts",
    "src/users/application/usecases/__tests__/unit/get-user.usecase.spec.ts",
    "src/users/application/usecases/__tests__/unit/update-user.usecase.spec.ts",
    "src/users/application/usecases/__tests__/unit/signin.usecase.spec.ts",
    "src/users/application/usecases/__tests__/unit/signup.usecase.spec.ts",
    "src/users/application/usecases/__tests__/unit/update-password.usecase.spec.ts",
    "src/users/application/usecases/__tests__/integration/list-users.usecase.int-spec.ts",
    "src/users/application/usecases/__tests__/integration/delete-user.usecase.int-spec.ts",
    "src/users/application/usecases/__tests__/integration/get-user.usecase.int-spec.ts",
    "src/users/application/usecases/__tests__/integration/update-user.usecase.int-spec.ts",
    "src/users/application/usecases/__tests__/integration/signin.usecase.int-spec.ts",
    "src/users/application/usecases/__tests__/integration/signup.usecase.int-spec.ts",
    "src/users/application/usecases/__tests__/integration/update-password.usecase.int-spec.ts",
    "src/users/domain/entities/user.entity.ts",
    "src/users/domain/entities/__tests__/unit/user.entity.spec.ts",
    "src/users/domain/entities/__tests__/integration/user.entity.int-spec.ts",
    "src/users/domain/repositories/user.repository.ts",
    "src/users/domain/testing/helpers/user-data-builder.ts",
    "src/users/domain/validators/user.validator.ts",
    "src/users/domain/validators/__tests__/unit/user.validator.spec.ts",
    "src/users/infrastructure/__tests__/unit/users.controller.spec.ts",
    "src/users/infrastructure/__tests__/e2e/create.e2e-spec.ts",
    "src/users/infrastructure/__tests__/e2e/update.e2e-spec.ts",
    "src/users/infrastructure/__tests__/e2e/search.e2e-spec.ts",
    "src/users/infrastructure/__tests__/e2e/remove.e2e-spec.ts",
    "src/users/infrastructure/__tests__/e2e/find-one.e2e-spec.ts",
    "src/users/infrastructure/__tests__/e2e/login.e2e-spec.ts",
    "src/users/infrastructure/__tests__/e2e/update-password.e2e-spec.ts",
    "src/users/infrastructure/database/in-memory/repositories/__tests__/unit/user-in-memory.repository.spec.ts",
    "src/users/infrastructure/database/in-memory/repositories/user-in-memory.repository.ts",
    "src/users/infrastructure/database/prisma/models/__tests__/integration/user-model.mapper.int-spec.ts",
    "src/users/infrastructure/database/prisma/models/user-model.mapper.ts",
    "src/users/infrastructure/database/prisma/repositories/__tests__/integration/user-prisma.repository.int-spec.ts",
    "src/users/infrastructure/database/prisma/repositories/user-prisma.repository.ts",
    "src/users/infrastructure/dtos/list-users.dto.ts",
    "src/users/infrastructure/dtos/signin.dto.ts",
    "src/users/infrastructure/dtos/signup.dto.ts",
    "src/users/infrastructure/dtos/update-password.dto.ts",
    "src/users/infrastructure/dtos/update-user.dto.ts",
    "src/users/infrastructure/presenters/__tests__/unit/user.presenter.spec.ts",
    "src/users/infrastructure/presenters/user.presenter.ts",
    "src/users/infrastructure/providers/hash-provider/__tests__/unit/bcrypt-hash.provider.spec.ts",
    "src/users/infrastructure/providers/hash-provider/bcrypt-hash.provider.ts",
    "src/users/infrastructure/users.controller.ts",
    "src/users/infrastructure/users.module.ts",
  ];

  // Ensure the basePath directory exists
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath, { recursive: true });
  }

  createFiles(basePath, defaultFiles, "default");

  // Inform the user to run npm install or yarn install
  console.log(`Project ${basePath} generated successfully!`);
  console.log(`cd ${basePath} to access the project!`);
  console.log(
    `To install the dependencies, run 'npm install' or 'yarn install' in the '${basePath}' directory.`
  );
};

// Main function to process command-line arguments and generate structure
const main = () => {
  const argv = yargs
    .scriptName("nestjs-ddd")
    .usage(
      "$0 <command> [options]",
      "Generate NestJS DDD module structure",
      (yargs) => {
        yargs
          .command(
            "g <moduleName>",
            "Generate module structure based on module name",
            (yargs) => {
              yargs.positional("moduleName", {
                describe: "Name of the module",
                type: "string",
              });
            }
          )
          .command(
            "new <projectName>",
            "Generate project default files",
            (yargs) => {
              yargs.positional("projectName", {
                describe: "Name of the project",
                type: "string",
              });
            }
          )
          .demandCommand(1, "You need to specify a command")
          .help()
          .alias("help", "h");
      }
    ).argv;

  if (argv._[0] === "g") {
    const moduleName = argv.moduleName.toLowerCase();
    generateStructure(moduleName);
  } else if (argv._[0] === "new") {
    const projectName = argv.projectName.toLowerCase();

    const basePath = path.join(projectName);
    generateDefaultFiles(basePath);
  }
};

main();
