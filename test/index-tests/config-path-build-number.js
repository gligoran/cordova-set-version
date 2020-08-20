import fs from 'fs-extra';

import readFile from '../read-file';
import cordovaSetVersion from '../../src';
import { tempProvidedConfigFile, entryConfigFiles, expectedXmlFiles } from '../configs';

function configPathBuildNumberTest() {
    describe('(configPath, buildNumber)', () => {
        it('should override existing buildNumber and preserve existing version', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            await cordovaSetVersion(tempProvidedConfigFile, 86);

            expect(readFile(tempProvidedConfigFile)).toBe(readFile(expectedXmlFiles.BUILD_TO_VERSION_AND_BUILD));
        });

        it('should add buildNumber and preserve existing version', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_NO_BUILD, tempProvidedConfigFile);

            await cordovaSetVersion(tempProvidedConfigFile, 86);

            expect(readFile(tempProvidedConfigFile)).toBe(readFile(expectedXmlFiles.BUILD_TO_VERSION_AND_NO_BUILD));
        });

        it('should override existing buildNumber and not add version', async () => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_BUILD, tempProvidedConfigFile);

            await cordovaSetVersion(tempProvidedConfigFile, 86);

            expect(readFile(tempProvidedConfigFile)).toBe(readFile(expectedXmlFiles.BUILD_TO_NO_VERSION_AND_BUILD));
        });

        it('should add buildNumber and not add version', async () => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_NO_BUILD, tempProvidedConfigFile);

            await cordovaSetVersion(tempProvidedConfigFile, 86);

            expect(readFile(tempProvidedConfigFile)).toBe(readFile(expectedXmlFiles.BUILD_TO_NO_VERSION_AND_NO_BUILD));
        });

        it('should return an error about configPath type', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            try {
                await cordovaSetVersion({}, 86);
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).toContain('configPath');
                expect(error.message).toContain('must be a');
            }
        });

        it('should return an error about missing config file', async () => {
            try {
                await cordovaSetVersion(tempProvidedConfigFile, 86);
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).toContain('no such file or directory');
                expect(error.message).toContain('config.provided.xml');
            }
        });

        it('should return an error about malformed config file', async () => {
            fs.copySync(entryConfigFiles.MALFORMED, tempProvidedConfigFile);

            try {
                await cordovaSetVersion(tempProvidedConfigFile, 86);
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).not.toContain('no such file or directory');
            }
        });
    });
}

export default configPathBuildNumberTest;
