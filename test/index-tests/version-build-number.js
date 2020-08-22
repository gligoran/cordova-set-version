import fs from 'fs-extra';

import readFile from '../read-file';
import cordovaSetVersion from '../../src';
import { tempConfigFile, entryConfigFiles, expectedXmlFiles } from '../configs';

function versionBuildNumberTest() {
    describe('({ version, buildNumber })', () => {
        test('should override both existing version and buildNumber', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            await cordovaSetVersion({ version: '2.4.9', buildNumber: 86 });

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.VERSION_AND_BUILD_TO_VERSION_AND_BUILD));
        });

        test('should override existing version and add buildNumber', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_NO_BUILD, tempConfigFile);

            await cordovaSetVersion({ version: '2.4.9', buildNumber: 86 });

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.VERSION_AND_BUILD_TO_VERSION_AND_NO_BUILD));
        });

        test('should add version and override existing buildNumber', async () => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_BUILD, tempConfigFile);

            await cordovaSetVersion({ version: '2.4.9', buildNumber: 86 });

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.VERSION_AND_BUILD_TO_NO_VERSION_AND_BUILD));
        });

        test('should add version and buildNumber', async () => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_NO_BUILD, tempConfigFile);

            await cordovaSetVersion({ version: '2.4.9', buildNumber: 86 });

            expect(readFile(tempConfigFile)).toBe(
                readFile(expectedXmlFiles.VERSION_AND_BUILD_TO_NO_VERSION_AND_NO_BUILD),
            );
        });

        test('should return an error about version type', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                await cordovaSetVersion({ version: {}, buildNumber: 86 });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).toContain('version');
                expect(error.message).toContain('must be a');
            }
        });

        test('should return an error about buildNumber type', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                await cordovaSetVersion({ version: '2.4.9', buildNumber: {} });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).toContain('buildNumber');
                expect(error.message).toContain('must be a');
            }
        });

        test('should return an error about missing config file', async () => {
            try {
                await cordovaSetVersion({ version: '2.4.9', buildNumber: 86 });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).toContain('no such file or directory');
                expect(error.message).toContain('config.xml');
            }
        });

        test('should return an error about malformed config file', async () => {
            fs.copySync(entryConfigFiles.MALFORMED, tempConfigFile);

            try {
                await cordovaSetVersion({ version: '2.4.9', buildNumber: 86 });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).not.toContain('no such file or directory');
            }
        });
    });
}

export default versionBuildNumberTest;
