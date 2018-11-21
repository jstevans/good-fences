"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const normalizePath_1 = require("./normalizePath");
const getAllConfigs_1 = require("./getAllConfigs");
// Returns an array of all the configs that apply to a given file
function getConfigsForFile(filePath) {
    let allConfigs = getAllConfigs_1.default();
    let configsForFile = [];
    let pathSegments = normalizePath_1.default(path.dirname(filePath)).split(path.sep);
    while (pathSegments.length) {
        let dirPath = pathSegments.join(path.sep);
        if (allConfigs[dirPath]) {
            configsForFile.push(allConfigs[dirPath]);
        }
        pathSegments.pop();
    }
    return configsForFile;
}
exports.default = getConfigsForFile;
