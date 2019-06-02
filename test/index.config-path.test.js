import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import chaiFiles, { file } from 'chai-files';
import fs from 'fs-extra';

import cordovaSetVersion from '../src';
import {
    tempProvidedConfigFile,
    entryConfigFiles,
    expectedXmlFiles,
    tempProvidedPluginConfigFile,
    entryPluginConfigFiles,
    expectedPluginXmlFiles
} from './configs';
import { tempPackageFile, entryPackageFiles } from './packages';

chai.use(chaiFiles);
chai.use(dirtyChai);

function configPathTest() {
    describe('(configPath)', () => {
        it('should override existing version and preserve existing buildNumber', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            await cordovaSetVersion(tempProvidedConfigFile);

            expect(file(tempProvidedConfigFile))
                .to
                .equal(file(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD));
        });

        it('should override existing version and not add buildNumber', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_NO_BUILD, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            await cordovaSetVersion(tempProvidedConfigFile);

            expect(file(tempProvidedConfigFile))
                .to
                .equal(file(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_NO_BUILD));
        });

        it('should add version and preserve existing buildNumber', async () => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_BUILD, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            await cordovaSetVersion(tempProvidedConfigFile);

            expect(file(tempProvidedConfigFile))
                .to
                .equal(file(expectedXmlFiles.PACKAGE_VERSION_TO_NO_VERSION_AND_BUILD));
        });

        it('should add version and not add buildNumber', async () => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_NO_BUILD, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            await cordovaSetVersion(tempProvidedConfigFile);

            expect(file(tempProvidedConfigFile))
                .to
                .equal(file(expectedXmlFiles.PACKAGE_VERSION_TO_NO_VERSION_AND_NO_BUILD));
        });

        it('should return an error about configPath type', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            try {
                await cordovaSetVersion({});
            } catch (error) {
                expect(error).to.exist();
                expect(error.message).to.contain('configPath');
                expect(error.message).to.contain('must be a');
            }
        });

        it('should return an error about missing config file', async () => {
            try {
                await cordovaSetVersion(tempProvidedConfigFile);
            } catch (error) {
                expect(error).to.exist();
                expect(error.message).to.contain('no such file or directory');
                expect(error.message).to.contain('config.provided.xml');
            }
        });

        it('should return an error about malformed config file', async () => {
            fs.copySync(entryConfigFiles.MALFORMED, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            try {
                await cordovaSetVersion(tempProvidedConfigFile);
            } catch (error) {
                expect(error).to.exist();
                expect(error.message).to.not.contain('no such file or directory');
            }
        });

        it('should return an error about missing package file', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);
            try {
                await cordovaSetVersion(tempProvidedConfigFile);
            } catch (error) {
                expect(error).to.exist();
                expect(error.message).to.contain('no such file or directory');
                expect(error.message).to.contain('package.json');
            }
        });

        it('should return an error about malformed package file', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.MALFORMED, tempPackageFile);

            try {
                await cordovaSetVersion(tempProvidedConfigFile);
            } catch (error) {
                expect(error).to.exist();
                expect(error.message).to.not.contain('no such file or directory');
            }
        });
    });

    describe('(pluginConfigPath)', () => {
        it('should override existing version', async () => {
            fs.copySync(entryPluginConfigFiles.VERSION, tempProvidedPluginConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            await cordovaSetVersion(tempProvidedPluginConfigFile);

            expect(file(tempProvidedPluginConfigFile))
                .to
                .equal(file(expectedPluginXmlFiles.PACKAGE_VERSION_TO_VERSION));
        });

        it('should add version', async () => {
            fs.copySync(entryPluginConfigFiles.NO_VERSION, tempProvidedPluginConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            await cordovaSetVersion(tempProvidedPluginConfigFile);

            expect(file(tempProvidedPluginConfigFile))
                .to
                .equal(file(expectedPluginXmlFiles.PACKAGE_VERSION_TO_NO_VERSION));
        });

        it('should return an error about pluginConfigPath type', async () => {
            fs.copySync(entryPluginConfigFiles.VERSION, tempProvidedPluginConfigFile);

            try {
                await cordovaSetVersion({});
            } catch (error) {
                expect(error).to.exist();
                expect(error.message).to.contain('configPath');
                expect(error.message).to.contain('must be a');
            }
        });

        it('should return an error about missing config file', async () => {
            try {
                await cordovaSetVersion(tempProvidedPluginConfigFile);
            } catch (error) {
                expect(error).to.exist();
                expect(error.message).to.contain('no such file or directory');
                expect(error.message).to.contain('plugin.provided.xml');
            }
        });

        it('should return an error about malformed config file', async () => {
            fs.copySync(entryPluginConfigFiles.MALFORMED, tempProvidedPluginConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            try {
                await cordovaSetVersion(tempProvidedPluginConfigFile);
            } catch (error) {
                expect(error).to.exist();
                expect(error.message).to.not.contain('no such file or directory');
            }
        });

        it('should return an error about missing package file', async () => {
            fs.copySync(entryPluginConfigFiles.VERSION, tempProvidedPluginConfigFile);
            try {
                await cordovaSetVersion(tempProvidedPluginConfigFile);
            } catch (error) {
                expect(error).to.exist();
                expect(error.message).to.contain('no such file or directory');
                expect(error.message).to.contain('package.json');
            }
        });

        it('should return an error about malformed package file', async () => {
            fs.copySync(entryPluginConfigFiles.VERSION, tempProvidedPluginConfigFile);
            fs.copySync(entryPackageFiles.MALFORMED, tempPackageFile);

            try {
                await cordovaSetVersion(tempProvidedPluginConfigFile);
            } catch (error) {
                expect(error).to.exist();
                expect(error.message).to.not.contain('no such file or directory');
            }
        });
    });
}

export default configPathTest;
