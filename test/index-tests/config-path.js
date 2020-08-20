import fs from 'fs-extra';

import readFile from '../read-file';
import cordovaSetVersion from '../../src';
import {
    tempProvidedConfigFile,
    entryConfigFiles,
    expectedXmlFiles,
    tempProvidedPluginConfigFile,
    entryPluginConfigFiles,
    expectedPluginXmlFiles,
} from '../configs';
import { tempPackageFile, entryPackageFiles } from '../packages';

function configPathTest() {
    describe('({ configPath })', () => {
        it('should override existing version and preserve existing buildNumber', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            await cordovaSetVersion({ configPath: tempProvidedConfigFile });

            expect(readFile(tempProvidedConfigFile)).toBe(
                readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD),
            );
        });

        it('should override existing version and not add buildNumber', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_NO_BUILD, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            await cordovaSetVersion({ configPath: tempProvidedConfigFile });

            expect(readFile(tempProvidedConfigFile)).toBe(
                readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_NO_BUILD),
            );
        });

        it('should add version and preserve existing buildNumber', async () => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_BUILD, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            await cordovaSetVersion({ configPath: tempProvidedConfigFile });

            expect(readFile(tempProvidedConfigFile)).toBe(
                readFile(expectedXmlFiles.PACKAGE_VERSION_TO_NO_VERSION_AND_BUILD),
            );
        });

        it('should add version and not add buildNumber', async () => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_NO_BUILD, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            await cordovaSetVersion({ configPath: tempProvidedConfigFile });

            expect(readFile(tempProvidedConfigFile)).toBe(
                readFile(expectedXmlFiles.PACKAGE_VERSION_TO_NO_VERSION_AND_NO_BUILD),
            );
        });

        it('should return an error about configPath type', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            try {
                await cordovaSetVersion({ configPath: {} });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).toContain('configPath');
                expect(error.message).toContain('must be a');
            }
        });

        it('should return an error about missing config file', async () => {
            try {
                await cordovaSetVersion({ configPath: tempProvidedConfigFile });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).toContain('no such file or directory');
                expect(error.message).toContain('config.provided.xml');
            }
        });

        it('should return an error about malformed config file', async () => {
            fs.copySync(entryConfigFiles.MALFORMED, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            try {
                await cordovaSetVersion({ configPath: tempProvidedConfigFile });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).not.toContain('no such file or directory');
            }
        });

        it('should return an error about missing package file', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);
            try {
                await cordovaSetVersion({ configPath: tempProvidedConfigFile });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).toContain('no such file or directory');
                expect(error.message).toContain('package.json');
            }
        });

        it('should return an error about malformed package file', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.MALFORMED, tempPackageFile);

            try {
                await cordovaSetVersion({ configPath: tempProvidedConfigFile });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).not.toContain('no such file or directory');
            }
        });
    });

    describe('({ pluginConfigPath })', () => {
        it('should override existing version', async () => {
            fs.copySync(entryPluginConfigFiles.VERSION, tempProvidedPluginConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            await cordovaSetVersion({ configPath: tempProvidedPluginConfigFile });

            expect(readFile(tempProvidedPluginConfigFile)).toBe(
                readFile(expectedPluginXmlFiles.PACKAGE_VERSION_TO_VERSION),
            );
        });

        it('should add version', async () => {
            fs.copySync(entryPluginConfigFiles.NO_VERSION, tempProvidedPluginConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            await cordovaSetVersion({ configPath: tempProvidedPluginConfigFile });

            expect(readFile(tempProvidedPluginConfigFile)).toBe(
                readFile(expectedPluginXmlFiles.PACKAGE_VERSION_TO_NO_VERSION),
            );
        });

        it('should return an error about pluginConfigPath type', async () => {
            fs.copySync(entryPluginConfigFiles.VERSION, tempProvidedPluginConfigFile);

            try {
                await cordovaSetVersion({ configPath: {} });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).toContain('configPath');
                expect(error.message).toContain('must be a');
            }
        });

        it('should return an error about missing config file', async () => {
            try {
                await cordovaSetVersion({ configPath: tempProvidedPluginConfigFile });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).toContain('no such file or directory');
                expect(error.message).toContain('plugin.provided.xml');
            }
        });

        it('should return an error about malformed config file', async () => {
            fs.copySync(entryPluginConfigFiles.MALFORMED, tempProvidedPluginConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            try {
                await cordovaSetVersion({ configPath: tempProvidedPluginConfigFile });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).not.toContain('no such file or directory');
            }
        });

        it('should return an error about missing package file', async () => {
            fs.copySync(entryPluginConfigFiles.VERSION, tempProvidedPluginConfigFile);
            try {
                await cordovaSetVersion({ configPath: tempProvidedPluginConfigFile });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).toContain('no such file or directory');
                expect(error.message).toContain('package.json');
            }
        });

        it('should return an error about malformed package file', async () => {
            fs.copySync(entryPluginConfigFiles.VERSION, tempProvidedPluginConfigFile);
            fs.copySync(entryPackageFiles.MALFORMED, tempPackageFile);

            try {
                await cordovaSetVersion({ configPath: tempProvidedPluginConfigFile });
            } catch (error) {
                expect(error).not.toBeNil();
                expect(error.message).not.toContain('no such file or directory');
            }
        });
    });
}

export default configPathTest;
