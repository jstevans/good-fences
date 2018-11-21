"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const normalizePath_1 = require("./normalizePath");
function loadConfig(file) {
    // Load the raw config
    let rawConfig = JSON.parse(fs.readFileSync(file).toString());
    // Normalize it
    return {
        path: normalizePath_1.default(path.dirname(file)),
        tags: rawConfig.tags,
        exports: rawConfig.exports,
        dependencies: normalizeDependencyRules(rawConfig.dependencies),
        imports: rawConfig.imports,
    };
}
exports.default = loadConfig;
function normalizeDependencyRules(rules) {
    if (!rules) {
        return null;
    }
    return rules.map(dependency => {
        // Upgrade simple strings to DependencyRule structs
        if (typeof dependency == 'string') {
            return {
                dependency,
                accessibleTo: null,
            };
        }
        else {
            return dependency;
        }
    });
}
