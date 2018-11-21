"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateExportRules_1 = require("./validateExportRules");
const getImportsFromFile_1 = require("../utils/getImportsFromFile");
const validateDependencyRules_1 = require("./validateDependencyRules");
const validateImportRules_1 = require("./validateImportRules");
function validateFile(filePath, tsProgram) {
    const imports = getImportsFromFile_1.default(filePath, tsProgram);
    for (let importRecord of imports) {
        validateExportRules_1.default(filePath, importRecord.filePath);
        if (importRecord.isExternal) {
            // External dependency, so apply dependency rules
            validateDependencyRules_1.default(filePath, importRecord);
        }
        else {
            // Internal dependency, so apply import rules
            validateImportRules_1.default(filePath, importRecord);
        }
    }
}
exports.default = validateFile;
