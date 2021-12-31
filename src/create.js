const { join } = require("path");
const { mkdir, writeFile } = require("fs/promises");
const { capitalize } = require("./utils");
const {
  templatesEnum,
  getTemplate
} = require("./template");

async function createFileWithTemplate(dir, file, template) {
  await mkdir(dir, { recursive: true });
  await writeFile(file, template);
}

async function createModule(name) {
  const capitalizedName = capitalize(name);
  const moduleDir = join("src", "modules", name);

  await mkdir(moduleDir, { recursive: true });

  await createRepository(`${capitalizedName}`, { module: name });

  const services = [
    "Create",
    "Update",
    "Delete",
    "List",
    "Show",
  ]

  for (const service of services) {
    await createService(`${service}${capitalizedName}`, { module: name });
  }

  console.log(`Module ${name} created`);
}

async function createDTO(name, options) {
  const fileName = `I${capitalize(name)}DTO.ts`;
  const dir = join("src", "modules", options.module, "dtos");
  const template = await getTemplate(templatesEnum.dto,name);
  const file = join("src", "modules", options.module, "dtos", fileName);

  await createFileWithTemplate(dir, file, template)

  console.log(`DTO ${fileName} created in module ${options.module}`);
}

async function createService(name, options) {
  const fileName = `${capitalize(name)}Service.ts`;
  const dir = join("src", "modules", options.module, "services");
  const template = await getTemplate(templatesEnum.service, name);
  const file = join(
    "src",
    "modules",
    options.module,
    "services",
    fileName
  );

  await createDTO(name, options);
  await createFileWithTemplate(dir, file, template)
  console.log(`Service ${fileName} created in module ${options.module}`);
}

async function createRepository(name, options) {
  const fileName = `${capitalize(name)}Repository.ts`;
  const dir = join("src", "modules", options.module, "repositories", "database");
  const template = await getTemplate(templatesEnum.repository, name);
  const file = join(
    "src",
    "modules",
    options.module,
    "repositories",
    "database",
    fileName
  );

  await createRepositoryInterface(name, options)
  await createFileWithTemplate(dir, file, template)

  console.log(`Repository ${fileName} created in module ${options.module}`);
}

async function createRepositoryInterface(name, options) {
  const fileName = `I${capitalize(name)}Repository.ts`;
  const dir = join("src", "modules", options.module, "repositories");
  const template = await getTemplate(templatesEnum.repositoryInterface, name);
  const file = join(
    "src",
    "modules",
    options.module,
    "repositories",
    fileName
  );

  await createFileWithTemplate(dir, file, template)

  console.log(`Interface Repository ${fileName} created in module ${options.module}`);
}

module.exports = {
  createModule,
  createService,
  createRepository,
  createDTO,
};
