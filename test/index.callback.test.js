'use strict';

import { expect } from 'chai';
import fs from 'fs-extra';

import cordovaSetVersion from '../src/index';
import { tempConfigFile, tempProvidedConfigFile, entryConfigFiles, expectedXmlFiles } from './configs';
import { tempPackageFile, entryPackageFiles } from './packages';

export default () => {
    describe('(callback)', () => {
        it('should override existing version and preserve existing buildNumber', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            cordovaSetVersion((error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('should override existing version and not add buildNumber', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_NO_BUILD, tempConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            cordovaSetVersion((error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_NO_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('should add version and preserve existing buildNumber', (done) => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_BUILD, tempConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            cordovaSetVersion((error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.PACKAGE_VERSION_TO_NO_VERSION_AND_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('should add version and not add buildNumber', (done) => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_NO_BUILD, tempConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            cordovaSetVersion((error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.PACKAGE_VERSION_TO_NO_VERSION_AND_NO_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('should return an error about missing config file', (done) => {
            cordovaSetVersion(tempConfigFile, (error) => {
                expect(error).to.exist;
                expect(error.message).to.contain('no such file or directory');
                expect(error.message).to.contain('config.xml');

                done();
            });
        });

        it('should return an error about malformed config file', (done) => {
            fs.copySync(entryConfigFiles.MALFORMED, tempConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            cordovaSetVersion((error) => {
                expect(error).to.exist;
                expect(error.message).to.not.contain('no such file or directory');

                done();
            });
        });

        it('should return an error about missing package file', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            cordovaSetVersion((error) => {
                expect(error).to.exist;
                expect(error.message).to.contain('no such file or directory');
                expect(error.message).to.contain('package.json');

                done();
            });
        });

        it('should return an error about malformed package file', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);
            fs.copySync(entryPackageFiles.MALFORMED, tempPackageFile);

            cordovaSetVersion((error) => {
                expect(error).to.exist;
                expect(error.message).to.not.contain('no such file or directory');

                done();
            });
        });
    });
}