import fs from 'fs-extra';

import readFile from '../read-file';
import cordovaSetVersion from '../../src';
import { tempConfigFile, entryConfigFiles, expectedXmlFiles } from '../configs';
import { tempPackageFile, entryPackageFiles } from '../packages';

function noArgumentsTest() {
    describe('()', () => {
        test('should override existing version and preserve existing buildNumber', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            await cordovaSetVersion();

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD));
        });

        test('should override existing version and not add buildNumber', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_NO_BUILD, tempConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            await cordovaSetVersion();

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_NO_BUILD));
        });

        test('should add version and preserve existing buildNumber', async () => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_BUILD, tempConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            await cordovaSetVersion();

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.PACKAGE_VERSION_TO_NO_VERSION_AND_BUILD));
        });

        test('should add version and not add buildNumber', async () => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_NO_BUILD, tempConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            await cordovaSetVersion();

            expect(readFile(tempConfigFile)).toBe(
                readFile(expectedXmlFiles.PACKAGE_VERSION_TO_NO_VERSION_AND_NO_BUILD),
            );
        });

        test('should return an error about missing config file', async () => {
            try {
                await cordovaSetVersion(tempConfigFile);
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).toContain('no such file or directory');
                expect(error.message).toContain('config.xml');
            }
        });

        test('should return an error about malformed config file', async () => {
            fs.copySync(entryConfigFiles.MALFORMED, tempConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            try {
                await cordovaSetVersion();
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).not.toContain('no such file or directory');
            }
        });

        test('should return an error about missing package file', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                await cordovaSetVersion();
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).toContain('no such file or directory');
                expect(error.message).toContain('package.json');
            }
        });

        test('should return an error about malformed package file', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);
            fs.copySync(entryPackageFiles.MALFORMED, tempPackageFile);

            try {
                await cordovaSetVersion();
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).not.toContain('no such file or directory');
            }
        });
    });
}

export default noArgumentsTest;
