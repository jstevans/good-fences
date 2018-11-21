"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getErrorString(error) {
    switch (error.kind) {
        case 'DependencyError':
        case 'ImportError':
            return `${error.sourceFile} is not allowed to import '${error.rawImport}'`;
        case 'ExportError':
            return `${error.sourceFile} is importing inaccessible module ${error.importFile}`;
        default:
            return (() => {
                throw error;
            })();
    }
}
exports.default = getErrorString;
