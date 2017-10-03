import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import chaiFiles, { file } from 'chai-files';
import fs from 'fs-extra';

import cordovaSetVersion from '../src/index';
import { tempConfigFile, entryConfigFiles, expectedXmlFiles } from './configs';

chai.use(chaiFiles);
chai.use(dirtyChai);

function versionBuildNumberCallbackTest() {
    describe('(version, buildNumber, callback)', () => {
        it('should override both existing version and buildNumber', done => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            cordovaSetVersion('2.4.9', 86, error => {
                expect(error).to.not.exist();
                expect(file(tempConfigFile))
                    .to
                    .equal(file(expectedXmlFiles.VERSION_AND_BUILD_TO_VERSION_AND_BUILD));

                done();
            });
        });

        it('should override existing version and add buildNumber', done => {
            fs.copySync(entryConfigFiles.VERSION_AND_NO_BUILD, tempConfigFile);

            cordovaSetVersion('2.4.9', 86, error => {
                expect(error).to.not.exist();
                expect(file(tempConfigFile))
                    .to
                    .equal(file(expectedXmlFiles.VERSION_AND_BUILD_TO_VERSION_AND_NO_BUILD));

                done();
            });
        });

        it('should add version and override existing buildNumber', done => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_BUILD, tempConfigFile);

            cordovaSetVersion('2.4.9', 86, error => {
                expect(error).to.not.exist();
                expect(file(tempConfigFile))
                    .to
                    .equal(file(expectedXmlFiles.VERSION_AND_BUILD_TO_NO_VERSION_AND_BUILD));

                done();
            });
        });

        it('should add version and buildNumber', done => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_NO_BUILD, tempConfigFile);

            cordovaSetVersion('2.4.9', 86, error => {
                expect(error).to.not.exist();
                expect(file(tempConfigFile))
                    .to
                    .equal(file(expectedXmlFiles.VERSION_AND_BUILD_TO_NO_VERSION_AND_NO_BUILD));

                done();
            });
        });

        it('should return an error about configPath type', done => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            cordovaSetVersion({}, 86, error => {
                expect(error).to.exist();
                expect(error.message).to.contain('configPath');
                expect(error.message).to.contain('must be a');

                done();
            });
        });

        it('should return an error about buildNumber type', done => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            cordovaSetVersion('2.4.9', {}, error => {
                expect(error).to.exist();
                expect(error.message).to.contain('buildNumber');
                expect(error.message).to.contain('must be a');

                done();
            });
        });

        it('should return an error about missing config file', done => {
            cordovaSetVersion('2.4.9', 86, error => {
                expect(error).to.exist();
                expect(error.message).to.contain('no such file or directory');
                expect(error.message).to.contain('config.xml');

                done();
            });
        });

        it('should return an error about malformed config file', done => {
            fs.copySync(entryConfigFiles.MALFORMED, tempConfigFile);

            cordovaSetVersion('2.4.9', 86, error => {
                expect(error).to.exist();
                expect(error.message).to.not.contain('no such file or directory');

                done();
            });
        });
    });
}

export default versionBuildNumberCallbackTest;
