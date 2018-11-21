"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
function normalizePath(...pathSegments) {
    // Resolve the raw path to an absolute path
    let normalizedPath = path.resolve.apply(null, pathSegments);
    // Normalize drive letters to upper case
    if (normalizedPath.match(/^[a-z]:/)) {
        normalizedPath = normalizedPath.substr(0, 1).toUpperCase() + normalizedPath.substr(1);
    }
    return normalizedPath;
}
exports.default = normalizePath;
