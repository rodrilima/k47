const { readFile } = require("fs/promises");
const { join } = require("path");

const templatesEnum = {
  service: 'service',
  dto: 'dto',
  repository: 'repository',
  repositoryInterface: 'repositoryInterface',
}

async function getTemplate(type, name) {
  const templates = {
    service: "service.template",
    dto: "dto.template",
    repository: "repository.template",
    repositoryInterface: "repositoryInterface.template"
  };

  const service = await readFile(
    join(__dirname, "templates", templates[type]),
    "utf-8"
  );

  return service.replace(/TargetName/g, name);
}

module.exports = {
  templatesEnum,
  getTemplate
};
