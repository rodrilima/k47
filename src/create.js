const { join } = require("path");
const { mkdir, writeFile } = require("fs/promises");
const { capitalize } = require("./utils");
const {
  getTemplate
} = require("./template");

async function createModule(name) {
  const capitalizedName = capitalize(name);
  const moduleDir = join("src", "modules", name);

  await mkdir(moduleDir, { recursive: true });

  await createService(`Create${capitalizedName}`, { module: name });
  await createService(`Update${capitalizedName}`, { module: name });
  await createService(`Delete${capitalizedName}`, { module: name });
  await createService(`List${capitalizedName}`, { module: name });
  await createService(`Show${capitalizedName}`, { module: name });

  console.log(`Module ${name} created`);
}

async function createDTO(name, options) {
  const dtoName = `I${capitalize(name)}DTO.ts`;
  const dtoDir = join("src", "modules", options.module, "dtos");
  const dtoFile = join("src", "modules", options.module, "dtos", dtoName);
  const dtoTemplate = await getTemplate('dto',name);

  await mkdir(dtoDir, { recursive: true });
  await writeFile(dtoFile, dtoTemplate);

  console.log(`DTO ${name} created in module ${options.module}`);
}

async function createService(name, options) {
  const serviceName = `${capitalize(name)}Service.ts`;
  const serviceDir = join("src", "modules", options.module, "services");
  const serviceFile = join(
    "src",
    "modules",
    options.module,
    "services",
    serviceName
  );
  const serviceTemplate = await getTemplate('service', name);

  await mkdir(serviceDir, { recursive: true });
  await writeFile(serviceFile, serviceTemplate);

  console.log(`Service ${serviceName} created in module ${options.module}`);

  await createDTO(name, options);
}

async function createRepository(name, options) {
  const repositoryName = `${capitalize(name)}Repository.ts`;
  const repositoryDir = join("src", "modules", options.module, "repositories");
  const repositoryFile = join(
    "src",
    "modules",
    options.module,
    "repositories",
    repositoryName
  );

  const repositoryTemplate = await getTemplate('repository', name);

  await mkdir(repositoryDir, { recursive: true });
  await writeFile(repositoryFile, repositoryTemplate);

  console.log(`Repository ${repositoryName} created in module ${options.module}`);
}

module.exports = {
  createModule,
  createService,
  createRepository,
  createDTO,
};
