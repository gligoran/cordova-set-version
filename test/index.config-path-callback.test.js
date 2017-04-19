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
    describe('(configPath, callback)', () => {
        it('should override existing version and preserve existing buildNumber', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            cordovaSetVersion(tempProvidedConfigFile, (error) => {
                expect(error).to.not.exist;
                expect(file(tempProvidedConfigFile)).to.equal(file(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD));

                done();
            });
        });

        it('should override existing version and not add buildNumber', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_NO_BUILD, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            cordovaSetVersion(tempProvidedConfigFile, (error) => {
                expect(error).to.not.exist;
                expect(file(tempProvidedConfigFile)).to.equal(file(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_NO_BUILD));

                done();
            });
        });

        it('should add version and preserve existing buildNumber', (done) => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_BUILD, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            cordovaSetVersion(tempProvidedConfigFile, (error) => {
                expect(error).to.not.exist;
                expect(file(tempProvidedConfigFile)).to.equal(file(expectedXmlFiles.PACKAGE_VERSION_TO_NO_VERSION_AND_BUILD));

                done();
            });
        });

        it('should add version and not add buildNumber', (done) => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_NO_BUILD, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            cordovaSetVersion(tempProvidedConfigFile, (error) => {
                expect(error).to.not.exist;
                expect(file(tempProvidedConfigFile)).to.equal(file(expectedXmlFiles.PACKAGE_VERSION_TO_NO_VERSION_AND_NO_BUILD));

                done();
            });
        });

        it('should return an error about configPath type', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            cordovaSetVersion({}, (error) => {
                expect(error).to.exist;
                expect(error.message).to.contain('configPath');
                expect(error.message).to.contain('must be a');

                done();
            });
        });

        it('should return an error about missing config file', (done) => {
            cordovaSetVersion(tempProvidedConfigFile, (error) => {
                expect(error).to.exist;
                expect(error.message).to.contain('no such file or directory');
                expect(error.message).to.contain('config.provided.xml');

                done();
            });
        });

        it('should return an error about malformed config file', (done) => {
            fs.copySync(entryConfigFiles.MALFORMED, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            cordovaSetVersion(tempProvidedConfigFile, (error) => {
                expect(error).to.exist;
                expect(error.message).to.not.contain('no such file or directory');

                done();
            });
        });

        it('should return an error about missing package file', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            cordovaSetVersion(tempProvidedConfigFile, (error) => {
                expect(error).to.exist;
                expect(error.message).to.contain('no such file or directory');
                expect(error.message).to.contain('package.json');

                done();
            });
        });

        it('should return an error about malformed package file', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.MALFORMED, tempPackageFile);

            cordovaSetVersion(tempProvidedConfigFile, (error) => {
                expect(error).to.exist;
                expect(error.message).to.not.contain('no such file or directory');

                done();
            });
        });
    });
}