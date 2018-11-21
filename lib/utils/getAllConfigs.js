"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob = require("glob");
const path = require("path");
const normalizePath_1 = require("./normalizePath");
const getOptions_1 = require("./getOptions");
const loadConfig_1 = require("./loadConfig");
let configSet = null;
function getAllConfigs() {
    if (!configSet) {
        configSet = {};
        // Glob for configs under the project root directory
        let files = glob.sync(normalizePath_1.default(getOptions_1.default().rootDir, '**/fence.json'));
        // If necessary, filter out external fences
        if (getOptions_1.default().ignoreExternalFences) {
            files = files.filter(f => f.split(path.sep).indexOf('node_modules') > -1);
        }
        files.forEach(file => {
            let config = loadConfig_1.default(file);
            configSet[config.path] = config;
        });
    }
    return configSet;
}
exports.default = getAllConfigs;
