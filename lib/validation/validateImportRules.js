"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const getConfigsForFile_1 = require("../utils/getConfigsForFile");
const reportError_1 = require("../core/reportError");
const getTagsForFile_1 = require("../utils/getTagsForFile");
function validateImportRules(sourceFile, importRecord) {
    // Validate against each config that applies to the imported file
    let configsForSource = getConfigsForFile_1.default(sourceFile);
    for (let config of configsForSource) {
        validateConfig(config, sourceFile, importRecord);
    }
}
exports.default = validateImportRules;
function validateConfig(config, sourceFile, importRecord) {
    // If the config doesn't specify imports then all imports are allowed
    if (!config.imports) {
        return;
    }
    // If the source file is under the config (i.e. the source and import files share the
    // config) then we don't apply the import rules
    if (!path.relative(config.path, importRecord.filePath).startsWith('..')) {
        return;
    }
    // For the the import to be valid, one of its tags needs to match one of the allowed tags
    let importTags = getTagsForFile_1.default(importRecord.filePath);
    for (let tag of config.imports) {
        if (importTags.indexOf(tag) != -1) {
            // A tag matched, so the import is valid
            return;
        }
    }
    // If we made it here, the import is invalid
    reportError_1.default('Import not allowed', sourceFile, importRecord.rawImport, config);
}
