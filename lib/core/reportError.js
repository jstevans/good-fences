"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const getOptions_1 = require("../utils/getOptions");
function reportError(message, sourceFile, rawImport, config) {
    let fencePath = config.path + path.sep + 'fence.json';
    let detailedMessage = `Good-fences violation in ${sourceFile}:\n` +
        `    ${message}: ${rawImport}\n` +
        `    Fence: ${fencePath}`;
    if (getOptions_1.default().onError) {
        getOptions_1.default().onError({
            message,
            sourceFile,
            rawImport,
            fencePath,
            detailedMessage,
        });
    }
}
exports.default = reportError;
