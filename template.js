const { readFile } = require("fs/promises");
const { join } = require("path");

async function getServiceTemplate(name) {
  const service = await readFile(
    join(__dirname, "templates", "services", "Service.ts"),
    "utf-8"
  );
  return service.replace(/ServiceName/g, name);
}

async function getInterfaceServiceTemplate(name) {
  const service = await readFile(
		join(__dirname, "templates", "dtos", "IServiceNameDTO.ts"),
		"utf-8"
	);
  return service.replace(/ServiceName/g, name);
}

module.exports = {
  getServiceTemplate,
  getInterfaceServiceTemplate,
};
