'use strict';

import chai from 'chai';
import chaiFiles from 'chai-files';
import fs from 'fs-extra';

import cordovaSetVersion from '../src/index';
import { tempConfigFile, tempProvidedConfigFile, entryConfigFiles, expectedXmlFiles } from './configs';
import { tempPackageFile, entryPackageFiles } from './packages';

chai.use(chaiFiles);
const expect = chai.expect;
const file = chaiFiles.file;

export default () => {
    describe('(version, callback)', () => {
        it('should override existing version and preserve existing buildNumber', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            cordovaSetVersion('2.4.9', (error) => {
                expect(error).to.not.exist;
                expect(file(tempConfigFile)).to.equal(file(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD));

                done();
            })
        });

        it('should override existing version and not add buildNumber', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_NO_BUILD, tempConfigFile);

            cordovaSetVersion('2.4.9', (error) => {
                expect(error).to.not.exist;
                expect(file(tempConfigFile)).to.equal(file(expectedXmlFiles.VERSION_TO_VERSION_AND_NO_BUILD));

                done();
            });
        });

        it('should add version and preserve existing buildNumber', (done) => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_BUILD, tempConfigFile);

            cordovaSetVersion('2.4.9', (error) => {
                expect(error).to.not.exist;
                expect(file(tempConfigFile)).to.equal(file(expectedXmlFiles.VERSION_TO_NO_VERSION_AND_BUILD));

                done();
            });
        });

        it('should add version and not add buildNumber', (done) => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_NO_BUILD, tempConfigFile);

            cordovaSetVersion('2.4.9', (error) => {
                expect(error).to.not.exist;
                expect(file(tempConfigFile)).to.equal(file(expectedXmlFiles.VERSION_TO_NO_VERSION_AND_NO_BUILD));

                done();
            });
        });

        it('should return an error about configPath type', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            cordovaSetVersion({}, (error) => {
                expect(error).to.exist;
                expect(error.message).to.contain('configPath');
                expect(error.message).to.contain('must be a');

                done();
            });
        });

        it('should return an error about missing config file', (done) => {
            cordovaSetVersion('2.4.9', (error) => {
                expect(error).to.exist;
                expect(error.message).to.contain('no such file or directory');
                expect(error.message).to.contain('config.xml');

                done();
            });
        });

        it('should return an error about malformed config file', (done) => {
            fs.copySync(entryConfigFiles.MALFORMED, tempConfigFile);

            cordovaSetVersion('2.4.9', (error) => {
                expect(error).to.exist;
                expect(error.message).to.not.contain('no such file or directory');

                done();
            });
        });
    });
}