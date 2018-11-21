"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImportRecord_1 = require("../core/ImportRecord");
function getImportsFromFile(filePath, tsProgram) {
    const importedFiles = tsProgram.getImportsForFile(filePath);
    return importedFiles
        .map(importInfo => new ImportRecord_1.default(importInfo.fileName, filePath, tsProgram))
        .filter(importRecord => importRecord.filePath);
}
exports.default = getImportsFromFile;
