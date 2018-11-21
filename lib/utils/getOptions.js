"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalizePath_1 = require("./normalizePath");
let options;
function getOptions() {
    return options;
}
exports.default = getOptions;
function setOptions(rawOptions) {
    // Normalize and apply defaults
    const rootDir = normalizePath_1.default(rawOptions.rootDir || process.cwd());
    const project = rawOptions.project
        ? normalizePath_1.default(rawOptions.project)
        : normalizePath_1.default(rootDir, 'tsconfig.json');
    options = {
        project,
        rootDir,
        ignoreExternalFences: rawOptions.ignoreExternalFences,
        onError: rawOptions.onError,
    };
}
exports.setOptions = setOptions;
