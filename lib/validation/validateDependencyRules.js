"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getConfigsForFile_1 = require("../utils/getConfigsForFile");
const reportError_1 = require("../core/reportError");
const fileMatchesTag_1 = require("../utils/fileMatchesTag");
const minimatch = require('minimatch');
function validateDependencyRules(sourceFile, importRecord) {
    // Validate against each config that applies to the imported file
    let configsForSource = getConfigsForFile_1.default(sourceFile);
    for (let config of configsForSource) {
        validateConfig(config, sourceFile, importRecord);
    }
}
exports.default = validateDependencyRules;
function validateConfig(config, sourceFile, importRecord) {
    // If the config doesn't specify dependencies then all dependencies are allowed
    if (!config.dependencies) {
        return;
    }
    // In order for the the dependency to be valid, there needs to be some rule that allows it
    for (let dependencyRule of config.dependencies) {
        // Check whether:
        //   1) The import matches the rule
        //   2) If necessary, the source file has a relevant tag
        if (minimatch(importRecord.rawImport, dependencyRule.dependency) &&
            (!dependencyRule.accessibleTo ||
                fileMatchesTag_1.default(sourceFile, dependencyRule.accessibleTo))) {
            // A rule matched, so the dependency is valid
            return;
        }
    }
    // If we made it here, we didn't find a rule that allows the dependency
    reportError_1.default('Dependency is not allowed', sourceFile, importRecord.rawImport, config);
}
