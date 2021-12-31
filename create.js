const { join } = require("path");
const { mkdir, writeFile } = require("fs/promises");
const { getServiceTemplate, getInterfaceServiceTemplate } = require("./template");

async function createModule(name) {
  await mkdir(join("src", "modules", name), { recursive: true });

  console.log(`Module ${name} created`);
}

async function createService(name, options) {
  await mkdir(join("src", "modules", options.module, "services"), {
    recursive: true,
  });

  await writeFile(
    join("src", "modules", options.module, "services", `${name}Service.ts`),
    await getServiceTemplate(name)
  );

  await mkdir(join("src", "modules", options.module, "dtos"), {
    recursive: true,
  });

  await writeFile(
    join("src", "modules", options.module, "dtos", `I${name}DTO.ts`),
    await getInterfaceServiceTemplate(name)
  );

  console.log(`Service ${name} created in module ${options.module}`);
}

module.exports = {
  createModule,
  createService,
};
