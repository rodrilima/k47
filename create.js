const { join } = require("path");
const { mkdir, writeFile } = require("fs/promises");

async function createModule(name) {
  await mkdir(join(__dirname, "src", "modules", name), { recursive: true });

  console.log(`Module ${name} created`);
}

async function createService(name, options) {
  await mkdir(join(__dirname, "src", "modules", options.module, "services"), {
    recursive: true,
  });

  await writeFile(
    join(__dirname, "src", "modules", options.module, "services", `${name}.ts`),
    "Hi"
  );

  console.log(`Service ${name} created in module ${options.module}`);
}

module.exports = {
  createModule,
  createService,
};
