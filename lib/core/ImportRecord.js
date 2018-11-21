"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const normalizePath_1 = require("../utils/normalizePath");
const path = require("path");
class ImportRecord {
    constructor(rawImport, sourceFile, tsProgram) {
        this.rawImport = rawImport;
        const resolvedFileName = tsProgram.resolveImportFromFile(rawImport, sourceFile);
        if (resolvedFileName) {
            this.filePath = normalizePath_1.default(resolvedFileName);
        }
    }
    // Is this import an external dependency (i.e. is it under node_modules)?
    get isExternal() {
        return this.filePath.split(path.sep).indexOf('node_modules') != -1;
    }
}
exports.default = ImportRecord;
