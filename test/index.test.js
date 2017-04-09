'use strict';

import { expect } from 'chai';
import fs from 'fs-extra';

import cordovaSetVersion from '../src/index';

const fileParams = {encoding: 'UTF-8'};
const configPaths = {
    COPY: './config.xml',
    GOOD: './configs/config.good.xml',
    MALFORMED: './configs/config.malformed.xml',
    MISSING: './configs/config.missing.xml',
    EXPECTED: './configs/config.expected.xml',
    EXPECTED_JSON: './configs/config.expected-json.xml'
};
const packagePaths = {
    COPY: './package.json',
    GOOD: './packages/package.good.json',
    MALFORMED: './packages/package.malformed.json',
    NO_VERSION: './packages/package.no-version.json',
    MISSING: './packages/package.missing.json'
};

describe('cordova-set-version', () => {
    before(() => {
        process.chdir(__dirname);
    });

    it('should exist', () => {
        expect(cordovaSetVersion).to.exist;
    });

    describe('setVersion', () => {
        it('should exist', () => {
            expect(cordovaSetVersion).to.have.property('setVersion');
        });

        it('should be a function', () => {
            expect(typeof cordovaSetVersion.setVersion).to.equal('function');
        });

        it('should produce same content as in `config.expected.xml` when passed the argument `1.0.0`', (done) => {
            fs.copySync(configPaths.GOOD, configPaths.COPY);

            cordovaSetVersion.setVersion(configPaths.COPY, '1.0.0', function (error) {
                expect(error).to.not.exist;

                let config = fs.readFileSync(configPaths.COPY, fileParams);
                let expectedConfig = fs.readFileSync(configPaths.EXPECTED, fileParams);
                expect(config).to.equal(expectedConfig);

                done();
            });
        });

        it('should return an error about missing config.xml file', (done) => {
            cordovaSetVersion.setVersion(configPaths.MISSING, '1.0.0', function (error) {
                expect(error).to.exist;
                expect(error.message).to.contain('no such file or directory');
                expect(error.message).to.contain(configPaths.MISSING);

                done();
            });
        });

        it('should return an error about bad config.xml file', (done) => {
            cordovaSetVersion.setVersion(configPaths.MALFORMED, '1.0.0', function (error) {
                expect(error).to.exist;
                expect(error.message).to.not.contain('no such file or directory');

                done();
            });
        });

        it('should use version from package.json', (done) => {
            fs.copySync(configPaths.GOOD, configPaths.COPY);
            fs.copySync(packagePaths.GOOD, packagePaths.COPY);

            cordovaSetVersion.setVersion(configPaths.COPY, null, function (error) {
                expect(error).to.not.exist;

                let config = fs.readFileSync(configPaths.COPY, fileParams);
                let expectedJsonConfig = fs.readFileSync(configPaths.EXPECTED_JSON, fileParams);
                expect(config).to.equal(expectedJsonConfig);

                done();
            });
        });

        it('should return an error about missing package file', (done) => {
            fs.copySync(configPaths.GOOD, configPaths.COPY);

            cordovaSetVersion.setVersion(configPaths.COPY, null, function (error) {
                expect(error).to.exist;
                expect(error.message).to.contain('no such file or directory');
                expect(error.message).to.contain('package.json');

                done();
            });
        });

        it('should return an error about bad package file', (done) => {
            fs.copySync(configPaths.GOOD, configPaths.COPY);
            fs.copySync(packagePaths.MALFORMED, packagePaths.COPY);

            cordovaSetVersion.setVersion(configPaths.COPY, null, function (error) {
                expect(error).to.exist;
                expect(error.message).to.contain('Unexpected end of input');
                expect(error.message).to.contain('package.json');

                done();
            });
        });

        it('should return an error about no version', (done) => {
            fs.copySync(configPaths.GOOD, configPaths.COPY);
            fs.copySync(packagePaths.NO_VERSION, packagePaths.COPY);

            cordovaSetVersion.setVersion(configPaths.COPY, null, function (error) {
                expect(error).to.exist;
                expect(error.message).to.contain('no version');
                expect(error.message).to.contain('package.json');

                done();
            });
        });

        afterEach(function() {
            if (fs.existsSync(configPaths.COPY)) {
                fs.removeSync(configPaths.COPY);
            }

            if (fs.existsSync(packagePaths.COPY)) {
                fs.removeSync(packagePaths.COPY);
            }
        });
    });
});
