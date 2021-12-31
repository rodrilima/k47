const { readFile } = require("fs/promises");
const { join } = require("path");

async function getTemplate(type, name) {
  let fileName;

  switch(type) {
    case 'service':
      fileName ="service.template"
      break;

    case 'dto':
      fileName ="dto.template"
      break;

    case 'repository':
      fileName ="repository.template"
      break;

    default:
      break;
  }

  const service = await readFile(
    join(__dirname, "templates", fileName),
    "utf-8"
  );

  return service.replace(/TargetName/g, name);
}

module.exports = {
  getTemplate
};
