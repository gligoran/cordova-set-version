import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import chaiFiles, { file } from 'chai-files';
import fs from 'fs-extra';

import cordovaSetVersion from '../src/';
import { tempProvidedConfigFile, entryConfigFiles, expectedXmlFiles } from './configs';

chai.use(chaiFiles);
chai.use(dirtyChai);

function configPathBuildNumberTest() {
    describe('(configPath, buildNumber)', () => {
        it('should override existing buildNumber and preserve existing version', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            await cordovaSetVersion(tempProvidedConfigFile, 86);

            expect(file(tempProvidedConfigFile))
                .to
                .equal(file(expectedXmlFiles.BUILD_TO_VERSION_AND_BUILD));
        });

        it('should add buildNumber and preserve existing version', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_NO_BUILD, tempProvidedConfigFile);

            await cordovaSetVersion(tempProvidedConfigFile, 86);

            expect(file(tempProvidedConfigFile))
                .to
                .equal(file(expectedXmlFiles.BUILD_TO_VERSION_AND_NO_BUILD));
        });

        it('should override existing buildNumber and not add version', async () => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_BUILD, tempProvidedConfigFile);

            await cordovaSetVersion(tempProvidedConfigFile, 86);

            expect(file(tempProvidedConfigFile))
                .to
                .equal(file(expectedXmlFiles.BUILD_TO_NO_VERSION_AND_BUILD));
        });

        it('should add buildNumber and not add version', async () => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_NO_BUILD, tempProvidedConfigFile);

            await cordovaSetVersion(tempProvidedConfigFile, 86);

            expect(file(tempProvidedConfigFile))
                .to
                .equal(file(expectedXmlFiles.BUILD_TO_NO_VERSION_AND_NO_BUILD));
        });

        it('should return an error about configPath type', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            try {
                await cordovaSetVersion({}, 86);
            } catch (error) {
                expect(error).to.exist();
                expect(error.message).to.contain('configPath');
                expect(error.message).to.contain('must be a');
            }
        });

        it('should return an error about missing config file', async () => {
            try {
                await cordovaSetVersion(tempProvidedConfigFile, 86);
            } catch (error) {
                expect(error).to.exist();
                expect(error.message).to.contain('no such file or directory');
                expect(error.message).to.contain('config.provided.xml');
            }
        });

        it('should return an error about malformed config file', async () => {
            fs.copySync(entryConfigFiles.MALFORMED, tempProvidedConfigFile);

            try {
                await cordovaSetVersion(tempProvidedConfigFile, 86);
            } catch (error) {
                expect(error).to.exist();
                expect(error.message).to.not.contain('no such file or directory');
            }
        });
    });
}

export default configPathBuildNumberTest;
