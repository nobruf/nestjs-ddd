# Nestjs DDD Generate

`nestjs-ddd` is a CLI tool designed to enhance the development of NestJS applications by automating the setup of Domain-Driven Design (DDD) module structures. This utility facilitates the creation of a standardized folder and file arrangement, adhering to DDD practices, which helps maintain a well-organized architecture across your projects.

## Key Features

- Automatic Scaffolding: Generates the directory and file structure for NestJS modules based on DDD principles.
- Customizable Templates: Provides and allows modification of templates for domains, DTOs, entities, mappers, repositories, controllers, services, and more.
- Development Efficiency: Accelerates the setup process for NestJS applications by offering a robust DDD framework.

## Installation

This package should be installed globally to ensure it can be run from anywhere in your system:

```bash
npm install -g nestjs-ddd
```

## Usage

Once installed, you can invoke the generator using the following command:
Generate NestJS DDD module structure

Commands:

```bash
 nestjs-ddd <command> [options]     Generate NestJS DDD module structure
```

```bash
 nestjs-ddd g <moduleName>          Generate module structure based on module
```

```bash
 nestjs-ddd new <projectName>       Generate project default files
```

## Templates

The provided templates based a [nestjs-ddd-boilerplate](https://github.com/mathehluiz/nestsjs-ddd-boilerplate).

## License

This project is licensed under the MIT License.
