"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const getConfigsForFile_1 = require("../utils/getConfigsForFile");
const fileMatchesConfigGlob_1 = require("../utils/fileMatchesConfigGlob");
const fileMatchesTag_1 = require("../utils/fileMatchesTag");
const reportError_1 = require("../core/reportError");
function validateExportRules(sourceFile, importFile) {
    // Validate against each config that applies to the imported file
    let configsForImport = getConfigsForFile_1.default(importFile);
    configsForImport.forEach(config => validateConfig(config, sourceFile, importFile));
}
exports.default = validateExportRules;
function validateConfig(config, sourceFile, importFile) {
    // If the source file is under the config (i.e. the source and import files share the
    // config) then we don't apply the export rules
    if (!path.relative(config.path, sourceFile).startsWith('..')) {
        return;
    }
    // If the config doesn't specify exports then everything is considered public
    if (!config.exports) {
        return;
    }
    // See if the config has an export rule that matches
    if (hasMatchingExport(config, sourceFile, importFile)) {
        return;
    }
    // If we made it here, the import is invalid
    reportError_1.default('Module is not exported', sourceFile, importFile, config);
}
function hasMatchingExport(config, sourceFile, importFile) {
    let isExported = false;
    Object.keys(config.exports).forEach(key => {
        let tags = config.exports[key];
        if (fileMatchesConfigGlob_1.default(importFile, config.path, key) &&
            fileMatchesTag_1.default(sourceFile, tags)) {
            isExported = true;
        }
    });
    return isExported;
}
