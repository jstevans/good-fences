"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const normalizePath_1 = require("./normalizePath");
const minimatch = require('minimatch');
function fileMatchesConfigGlob(importFile, configPath, key) {
    // '*' matches all files under the config
    if (key == '*') {
        return true;
    }
    // Remove the file extension before matching
    importFile = removeFileExtension(importFile);
    return minimatch(importFile, normalizePath_1.default(configPath, key));
}
exports.default = fileMatchesConfigGlob;
function removeFileExtension(filePath) {
    // Special case for .d.ts files
    let extension = filePath.endsWith('.d.ts') ? '.d.ts' : path.extname(filePath);
    return filePath.slice(0, -extension.length);
}
