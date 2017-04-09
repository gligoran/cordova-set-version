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
    EXPECTED: './configs/config.expected.xml'
};

describe('cordova-set-version', () => {
    beforeEach(() => {
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

                var config = fs.readFileSync(configPaths.COPY, fileParams);
                var expectedConfig = fs.readFileSync(configPaths.EXPECTED, fileParams);
                expect(config).to.equal(expectedConfig);

                done();
            });
        });

        it('should return an error about missing file', (done) => {
            cordovaSetVersion.setVersion(configPaths.MISSING, '1.0.0', function (error) {
                expect(error).to.exist;
                expect(error.message).to.contain('no such file or directory');
                expect(error.message).to.contain(configPaths.MISSING);

                done();
            });
        });

        it('should return an error about bad file', (done) => {
            cordovaSetVersion.setVersion(configPaths.MALFORMED, '1.0.0', function (error) {
                expect(error).to.exist;
                expect(error.message).to.not.contain('no such file or directory');

                done();
            });
        });
    });
});
