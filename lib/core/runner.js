"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getOptions_1 = require("../utils/getOptions");
const validateFile_1 = require("../validation/validateFile");
const TypeScriptProgram_1 = require("./TypeScriptProgram");
const normalizePath_1 = require("../utils/normalizePath");
function run(rawOptions) {
    // Store options so they can be globally available
    getOptions_1.setOptions(rawOptions);
    // Run validation
    let tsProgram = new TypeScriptProgram_1.default(getOptions_1.default().project);
    let files = tsProgram.getSourceFiles();
    files.forEach(file => {
        validateFile_1.default(normalizePath_1.default(file), tsProgram);
    });
}
exports.run = run;
