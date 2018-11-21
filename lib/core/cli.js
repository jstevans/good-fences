"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
const runner_1 = require("./runner");
// Read the package version from package.json
const packageVersion = require('../../package').version;
// Parse command line options
const options = commander
    .version(packageVersion)
    .option('-p, --project <string>', 'tsconfig.json file')
    .option('-r, --rootDir <string>', 'root directory of the project')
    .parse(process.argv);
let hadError = false;
// Run good-fences
runner_1.run(Object.assign({}, options, { onError(error) {
        console.error(error.detailedMessage);
        hadError = true;
    } }));
// Indicate success or failure via the exit code
process.exitCode = hadError ? 1 : 0;
