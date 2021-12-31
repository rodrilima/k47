#!/usr/bin/env node

const commander = require("commander");
const package = require("./package.json");
const {
  createModule,
  createService,
  createRepository,
} = require("./src/create");

const program = new commander.Command();

program.version(package.version);

const createCommand = program.command("create");

createCommand.description("Create a new resource");

createCommand
  .command("module [name]")
  .description("Create a new module")
  .action(createModule);

createCommand
  .command("service [name]")
  .requiredOption("-m, --module <module>", "Module name")
  .description("Create a new service")
  .action(createService);

createCommand
  .command("repository [name]")
  .requiredOption("-m, --module <module>", "Module name")
  .description("Create a new repository")
  .action(createRepository);

program.parse(process.argv);
