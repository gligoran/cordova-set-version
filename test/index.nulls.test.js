'use strict';

import { expect } from 'chai';
import fs from 'fs-extra';

import cordovaSetVersion from '../src/index';
import { tempConfigFile, tempProvidedConfigFile, entryConfigFiles, expectedXmlFiles } from './configs';
import { tempPackageFile, entryPackageFiles } from './packages';

export default () => {
    describe('nulls', () => {
        it('(configPath, version, buildNumber, null)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            try {
                cordovaSetVersion(tempProvidedConfigFile, '2.4.9', 86, null);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(configPath, version, null, callback)', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            cordovaSetVersion(tempProvidedConfigFile, '2.4.9', null, (error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempProvidedConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('(configPath, version, null, null)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            try {
                cordovaSetVersion(tempProvidedConfigFile, '2.4.9', null, null);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(configPath, version, null)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            try {
                cordovaSetVersion(tempProvidedConfigFile, '2.4.9', null);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(configPath, null, buildNumber, callback)', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            cordovaSetVersion(tempProvidedConfigFile, null, 86, (error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempProvidedConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.BUILD_TO_VERSION_AND_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('(configPath, null, buildNumber, null)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            try {
                cordovaSetVersion(tempProvidedConfigFile, null, 86, null);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(configPath, null, buildNumber)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            try {
                cordovaSetVersion(tempProvidedConfigFile, null, 86);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(configPath, null, null, callback)', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            cordovaSetVersion(tempProvidedConfigFile, null, null, (error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempProvidedConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('(configPath, null, null, null)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            try {
                cordovaSetVersion(tempProvidedConfigFile, null, null, null);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(configPath, null, null)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            try {
                cordovaSetVersion(tempProvidedConfigFile, null, null);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(configPath, null, callback)', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            cordovaSetVersion(tempProvidedConfigFile, null, (error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempProvidedConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('(configPath, null)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            try {
                cordovaSetVersion(tempProvidedConfigFile, null);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(configPath, buildNumber, null)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            try {
                cordovaSetVersion(tempProvidedConfigFile, 86, null);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(null, version, buildNumber, callback)', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            cordovaSetVersion(null, '2.4.9', 86, (error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.VERSION_AND_BUILD_TO_VERSION_AND_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('(null, version, buildNumber, null)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                cordovaSetVersion(null, '2.4.9', 86, null);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(null, version, buildNumber)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                cordovaSetVersion(null, '2.4.9', 86);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(null, version, null, callback)', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            cordovaSetVersion(null, '2.4.9', null, (error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('(null, version, null, null)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                cordovaSetVersion(null, '2.4.9', null, null);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(null, version, null)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                cordovaSetVersion(null, '2.4.9', null);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(null, version, callback)', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            cordovaSetVersion(null, '2.4.9', (error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('(null, version)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                cordovaSetVersion(null, '2.4.9');
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(null, null, buildNumber, callback)', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            cordovaSetVersion(null, null, 86, (error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.BUILD_TO_VERSION_AND_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('(null, null, buildNumber, null)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                cordovaSetVersion(null, null, 86, null);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(null, null, buildNumber)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                cordovaSetVersion(null, null, 86);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(null, null, null, callback)', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            cordovaSetVersion(null, null, null, (error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('(null, null, null, null)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                cordovaSetVersion(null, null, null, null);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(null, null, null)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                cordovaSetVersion(null, null, null);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(null, null, callback)', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            cordovaSetVersion(null, null, (error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('(null, null)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                cordovaSetVersion(null, null, null, null);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(null, buildNumber, callback)', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            cordovaSetVersion(null, 86, (error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.BUILD_TO_VERSION_AND_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('(null, buildNumber, null)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                cordovaSetVersion(null, 86, null);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(null, buildNumber)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                cordovaSetVersion(null, 86);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(null, callback)', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            cordovaSetVersion(null, (error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('(null)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                cordovaSetVersion(null, null, null, null);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(version, buildNumber, null)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                cordovaSetVersion('2.4.9', 86, null);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(version, null, callback)', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            cordovaSetVersion('2.4.9', null, (error) => {
                expect(error).to.not.exist;

                let xml = fs.readFileSync(tempConfigFile, 'UTF-8');
                let expectedXml = fs.readFileSync(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD, 'UTF-8');
                expect(xml).to.equal(expectedXml);

                done();
            });
        });

        it('(version, null, null)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                cordovaSetVersion('2.4.9', null, null);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(version, null)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                cordovaSetVersion('2.4.9', null);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });

        it('(buildNumber, null)', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            try {
                cordovaSetVersion(86, null);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });
    });
}