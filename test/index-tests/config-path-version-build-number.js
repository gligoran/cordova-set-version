import fs from 'fs-extra';

import readFile from '../read-file';
import cordovaSetVersion from '../../src';
import { tempProvidedConfigFile, entryConfigFiles, expectedXmlFiles } from '../configs';

function configPathVersionBuildNumberTest() {
    describe('({ configPath, version, buildNumber })', () => {
        it('should override both existing version and buildNumber', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            await cordovaSetVersion({ configPath: tempProvidedConfigFile, version: '2.4.9', buildNumber: 86 });

            expect(readFile(tempProvidedConfigFile)).toBe(
                readFile(expectedXmlFiles.VERSION_AND_BUILD_TO_VERSION_AND_BUILD),
            );
        });

        it('should override existing version and add buildNumber', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_NO_BUILD, tempProvidedConfigFile);

            await cordovaSetVersion({ configPath: tempProvidedConfigFile, version: '2.4.9', buildNumber: 86 });

            expect(readFile(tempProvidedConfigFile)).toBe(
                readFile(expectedXmlFiles.VERSION_AND_BUILD_TO_VERSION_AND_NO_BUILD),
            );
        });

        it('should add version and override existing buildNumber', async () => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_BUILD, tempProvidedConfigFile);

            await cordovaSetVersion({ configPath: tempProvidedConfigFile, version: '2.4.9', buildNumber: 86 });

            expect(readFile(tempProvidedConfigFile)).toBe(
                readFile(expectedXmlFiles.VERSION_AND_BUILD_TO_NO_VERSION_AND_BUILD),
            );
        });

        it('should add version and buildNumber', async () => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_NO_BUILD, tempProvidedConfigFile);

            await cordovaSetVersion({ configPath: tempProvidedConfigFile, version: '2.4.9', buildNumber: 86 });

            expect(readFile(tempProvidedConfigFile)).toBe(
                readFile(expectedXmlFiles.VERSION_AND_BUILD_TO_NO_VERSION_AND_NO_BUILD),
            );
        });

        it('should return an error about configPath type', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            try {
                await cordovaSetVersion({ configPath: {}, version: '2.4.9', buildNumber: 86 });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).toContain('configPath');
                expect(error.message).toContain('must be a');
            }
        });

        it('should return an error about version type', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            try {
                await cordovaSetVersion({ configPath: tempProvidedConfigFile, version: {}, buildNumber: 86 });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).toContain('version');
                expect(error.message).toContain('must be a');
            }
        });

        it('should return an error about buildNumber type', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            try {
                await cordovaSetVersion({ configPath: tempProvidedConfigFile, version: '2.4.9', buildNumber: {} });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).toContain('buildNumber');
                expect(error.message).toContain('must be a');
            }
        });

        it('should return an error about missing config file', async () => {
            try {
                await cordovaSetVersion({ configPath: tempProvidedConfigFile, version: '2.4.9', buildNumber: 86 });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).toContain('no such file or directory');
                expect(error.message).toContain('config.provided.xml');
            }
        });

        it('should return an error about malformed config file', async () => {
            fs.copySync(entryConfigFiles.MALFORMED, tempProvidedConfigFile);

            try {
                await cordovaSetVersion({ configPath: tempProvidedConfigFile, version: '2.4.9', buildNumber: 86 });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).not.toContain('no such file or directory');
            }
        });
    });
}

export default configPathVersionBuildNumberTest;
