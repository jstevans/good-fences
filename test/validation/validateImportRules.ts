import Config from '../../src/types/Config';
import validateImportRules from '../../src/validation/validateImportRules';
import * as getConfigsForFile from '../../src/utils/getConfigsForFile';

describe('validateImportRules', () => {
    const sourceFile = 'testfile.ts';
    let configsToReturn: Config[] = null;

    beforeEach(() => {
        spyOn(getConfigsForFile, 'default').and.callFake(() => configsToReturn);
    });

    it('validates each config that applies to the source file', () => {
        // Arrange
        configsToReturn = <any>[{}, {}, {}];

        // Act
        validateImportRules(<any>sourceFile, null);

        // Assert
        expect(getConfigsForFile.default).toHaveBeenCalledWith(sourceFile);
        expect;
    });
});
