import fs from 'fs-extra';

import readFile from '../read-file';
import cordovaSetVersion from '../../src';
import { tempConfigFile, entryConfigFiles, expectedXmlFiles } from '../configs';

function buildNumberTest() {
    describe('({ buildNumber })', () => {
        test('should override existing buildNumber and preserve existing version', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            await cordovaSetVersion({ buildNumber: 86 });

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.BUILD_TO_VERSION_AND_BUILD));
        });

        test('should add buildNumber and preserve existing version', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_NO_BUILD, tempConfigFile);

            await cordovaSetVersion({ buildNumber: 86 });

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.BUILD_TO_VERSION_AND_NO_BUILD));
        });

        test('should override existing buildNumber and not add version', async () => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_BUILD, tempConfigFile);

            await cordovaSetVersion({ buildNumber: 86 });

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.BUILD_TO_NO_VERSION_AND_BUILD));
        });

        test('should add buildNumber and not add version', async () => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_NO_BUILD, tempConfigFile);

            await cordovaSetVersion({ buildNumber: 86 });

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.BUILD_TO_NO_VERSION_AND_NO_BUILD));
        });

        test('should return an error about buildNumber type', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                await cordovaSetVersion({ buildNumber: {} });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).toContain('buildNumber');
                expect(error.message).toContain('must be a');
            }
        });

        test('should return an error about buildNumber type', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                await cordovaSetVersion({ buildNumber: 86.2 });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).toContain('buildNumber');
                expect(error.message).toContain('must be a');
            }
        });

        test('should return an error about missing config file', async () => {
            try {
                await cordovaSetVersion({ buildNumber: 86 });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).toContain('no such file or directory');
                expect(error.message).toContain('config.xml');
            }
        });

        test('should return an error about malformed config file', async () => {
            fs.copySync(entryConfigFiles.MALFORMED, tempConfigFile);

            try {
                await cordovaSetVersion({ buildNumber: 86 });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).not.toContain('no such file or directory');
            }
        });
    });
}

export default buildNumberTest;
