const fs = require('fs');
const packageJson = require('./package.json');

const versionInfo = {
  version: packageJson.version,
};

fs.writeFileSync('./public/version.json', JSON.stringify(versionInfo, null, 2));
