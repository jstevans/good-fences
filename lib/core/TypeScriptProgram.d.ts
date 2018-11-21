import * as ts from 'typescript';
import NormalizedPath from '../types/NormalizedPath';
export default class TypeScriptProgram {
    private compilerOptions;
    private compilerHost;
    private program;
    constructor(configFile: NormalizedPath);
    getSourceFiles(): string[];
    getImportsForFile(fileName: NormalizedPath): ts.FileReference[];
    resolveImportFromFile(moduleName: string, containingFile: NormalizedPath): string;
}
