import NormalizedPath from '../types/NormalizedPath';
import TypeScriptProgram from './TypeScriptProgram';
export default class ImportRecord {
    rawImport: string;
    filePath: NormalizedPath;
    constructor(rawImport: string, sourceFile: NormalizedPath, tsProgram: TypeScriptProgram);
    readonly isExternal: boolean;
}
