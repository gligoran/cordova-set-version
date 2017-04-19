'use strict';

import { expect } from 'chai';
import fs from 'fs-extra';

import cordovaSetVersion from '../src/index';
import { tempConfigFile, tempProvidedConfigFile, entryConfigFiles, expectedXmlFiles } from './configs';
import { tempPackageFile, entryPackageFiles } from './packages';

export default () => {
    describe('(buildNumber, callback)', () => {
        it('should override existing buildNumber and preserve existing version', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            cordovaSetVersion(86, (error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.BUILD_TO_VERSION_AND_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('should add buildNumber and preserve existing version', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_NO_BUILD, tempConfigFile);

            cordovaSetVersion(86, (error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.BUILD_TO_VERSION_AND_NO_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('should override existing buildNumber and not add version', (done) => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_BUILD, tempConfigFile);

            cordovaSetVersion(86, (error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.BUILD_TO_NO_VERSION_AND_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('should add buildNumber and not add version', (done) => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_NO_BUILD, tempConfigFile);

            cordovaSetVersion(86, (error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.BUILD_TO_NO_VERSION_AND_NO_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

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
            cordovaSetVersion(86, (error) => {
                expect(error).to.exist;
                expect(error.message).to.contain('no such file or directory');
                expect(error.message).to.contain('config.xml');

                done();
            });
        });

        it('should return an error about malformed config file', (done) => {
            fs.copySync(entryConfigFiles.MALFORMED, tempConfigFile);

            cordovaSetVersion(86, (error) => {
                expect(error).to.exist;
                expect(error.message).to.not.contain('no such file or directory');

                done();
            });
        });
    });
}