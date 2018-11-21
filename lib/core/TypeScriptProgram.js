"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const ts = require("typescript");
// Helper class for interacting with TypeScript
class TypeScriptProgram {
    constructor(configFile) {
        // Parse the config file
        const projectPath = path.dirname(configFile);
        const config = readConfigFile(configFile);
        const parsedConfig = ts.parseJsonConfigFileContent(config, ts.sys, projectPath);
        this.compilerOptions = parsedConfig.options;
        // Create the program
        this.compilerHost = ts.createCompilerHost(this.compilerOptions);
        this.program = ts.createProgram(parsedConfig.fileNames, this.compilerOptions, this.compilerHost);
    }
    getSourceFiles() {
        // Filter out .d.ts files
        return this.program
            .getSourceFiles()
            .map(file => file.fileName)
            .filter(fileName => !fileName.endsWith('.d.ts'));
    }
    // Get all imports from a given file
    getImportsForFile(fileName) {
        let fileInfo = ts.preProcessFile(ts.sys.readFile(fileName), true, true);
        return fileInfo.importedFiles;
    }
    // Resolve an imported module
    resolveImportFromFile(moduleName, containingFile) {
        const resolvedFile = ts.resolveModuleName(moduleName, containingFile.replace(/\\/g, '/'), // TypeScript doesn't like backslashes here
        this.compilerOptions, this.compilerHost, null // TODO: provide a module resolution cache
        );
        return resolvedFile.resolvedModule && resolvedFile.resolvedModule.resolvedFileName;
    }
}
exports.default = TypeScriptProgram;
function readConfigFile(configFile) {
    const { config, error } = ts.readConfigFile(configFile, ts.sys.readFile);
    if (error) {
        throw new Error('Error reading project file: ' + error.messageText);
    }
    return config;
}
