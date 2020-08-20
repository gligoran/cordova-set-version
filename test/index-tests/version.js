import fs from 'fs-extra';

import readFile from '../read-file';
import cordovaSetVersion from '../../src';
import { tempConfigFile, entryConfigFiles, expectedXmlFiles } from '../configs';

function versionTest() {
    describe('(version)', () => {
        it('should override existing version and preserve existing buildNumber', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            await cordovaSetVersion('2.4.9');

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD));
        });

        it('should override existing version and not add buildNumber', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_NO_BUILD, tempConfigFile);

            await cordovaSetVersion('2.4.9');

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.VERSION_TO_VERSION_AND_NO_BUILD));
        });

        it('should add version and preserve existing buildNumber', async () => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_BUILD, tempConfigFile);

            await cordovaSetVersion('2.4.9');

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.VERSION_TO_NO_VERSION_AND_BUILD));
        });

        it('should add version and not add buildNumber', async () => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_NO_BUILD, tempConfigFile);

            await cordovaSetVersion('2.4.9');

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.VERSION_TO_NO_VERSION_AND_NO_BUILD));
        });

        it('should return an error about configPath type', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                await cordovaSetVersion({});
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).toContain('configPath');
                expect(error.message).toContain('must be a');
            }
        });

        it('should return an error about missing config file', async () => {
            try {
                await cordovaSetVersion('2.4.9');
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).toContain('no such file or directory');
                expect(error.message).toContain('config.xml');
            }
        });

        it('should return an error about malformed config file', async () => {
            fs.copySync(entryConfigFiles.MALFORMED, tempConfigFile);

            try {
                await cordovaSetVersion('2.4.9');
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).not.toContain('no such file or directory');
            }
        });
    });
}

export default versionTest;
