'use strict';

import { expect } from 'chai';
import fs from 'fs-extra';

import cordovaSetVersion from '../src/index';
import { tempConfigFile, tempProvidedConfigFile, entryConfigFiles, expectedXmlFiles } from './configs';
import { tempPackageFile, entryPackageFiles } from './packages';

export default () => {
    describe('(configPath, version, buildNumber, callback)', () => {
        it('should override both existing version and buildNumber', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            cordovaSetVersion(tempProvidedConfigFile, '2.4.9', 86, (error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempProvidedConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.VERSION_AND_BUILD_TO_VERSION_AND_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('should override existing version and add buildNumber', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_NO_BUILD, tempProvidedConfigFile);

            cordovaSetVersion(tempProvidedConfigFile, '2.4.9', 86, (error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempProvidedConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.VERSION_AND_BUILD_TO_VERSION_AND_NO_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('should add version and override existing buildNumber', (done) => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_BUILD, tempProvidedConfigFile);

            cordovaSetVersion(tempProvidedConfigFile, '2.4.9', 86, (error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempProvidedConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.VERSION_AND_BUILD_TO_NO_VERSION_AND_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('should add version and buildNumber', (done) => {
            fs.copySync(entryConfigFiles.NO_VERSION_AND_NO_BUILD, tempProvidedConfigFile);

            cordovaSetVersion(tempProvidedConfigFile, '2.4.9', 86, (error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempProvidedConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.VERSION_AND_BUILD_TO_NO_VERSION_AND_NO_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('should return an error about configPath type', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            cordovaSetVersion({}, '2.4.9', 86, (error) => {
                expect(error).to.exist;
                expect(error.message).to.contain('configPath');
                expect(error.message).to.contain('must be a');

                done();
            });
        });

        it('should return an error about version type', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            cordovaSetVersion(tempProvidedConfigFile, {}, 86, (error) => {
                expect(error).to.exist;
                expect(error.message).to.contain('version');
                expect(error.message).to.contain('must be a');

                done();
            });
        });

        it('should return an error about buildNumber type', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            cordovaSetVersion(tempProvidedConfigFile, '2.4.9', {}, (error) => {
                expect(error).to.exist;
                expect(error.message).to.contain('buildNumber');
                expect(error.message).to.contain('must be a');

                done();
            });
        });

        it('should return an error about missing config file', (done) => {
            cordovaSetVersion(tempProvidedConfigFile, '2.4.9', 86, (error) => {
                expect(error).to.exist;
                expect(error.message).to.contain('no such file or directory');
                expect(error.message).to.contain('config.provided.xml');

                done();
            });
        });

        it('should return an error about malformed config file', (done) => {
            fs.copySync(entryConfigFiles.MALFORMED, tempProvidedConfigFile);

            cordovaSetVersion(tempProvidedConfigFile, '2.4.9', 86, (error) => {
                expect(error).to.exist;
                expect(error.message).to.not.contain('no such file or directory');

                done();
            });
        });
    });
}