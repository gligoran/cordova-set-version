'use strict';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import fs from 'fs-promise';

import cordovaSetVersion from '../src/index';

const fileParams = { encoding: 'UTF-8' };
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

chai.use(chaiAsPromised);
chai.should();

describe('setVersion', () => {
    before(() => {
        process.chdir(__dirname);
    });

    it('should exist', () => {
        cordovaSetVersion.should.have.property('setVersion');
    });

    it('should be a function', () => {
        let type = typeof cordovaSetVersion.setVersion;
        type.should.equal('function');
    });

    it('should produce same content as in `config.expected.xml` when passed the argument `1.0.0`', () => {
        fs.copySync(configPaths.GOOD, configPaths.COPY);

        let promise = cordovaSetVersion.setVersion(configPaths.COPY, '1.0.0')
            .then(() => fs.readFile(configPaths.COPY, fileParams));

        let expectedConfig = fs.readFileSync(configPaths.EXPECTED, fileParams);

        return promise.should.be.fulfilled
            .then((result) => {
                result.should.equal(expectedConfig);
            });
    });

    it('should return an error about missing config.xml file', () => {
        let promise = cordovaSetVersion.setVersion(configPaths.MISSING, '1.0.0')
            .then(() => fs.readFile(configPaths.COPY, fileParams));

        return promise.should.be.rejected
            .then((error) => {
                error.should.be.instanceOf(Error);
                error.should.have.property('message');
                error.message.should.contain('no such file or directory');
                error.message.should.contain(configPaths.MISSING);
            });
    });

    it('should return an error about bad config.xml file', () => {
        let promise = cordovaSetVersion.setVersion(configPaths.MALFORMED, '1.0.0')

        return promise.should.be.rejected
            .then((error) => {
                error.should.be.instanceOf(Error);
                error.message.should.not.contain('no such file or directory');
            });
    });

    it('should use version from package.json', () => {
        fs.copySync(configPaths.GOOD, configPaths.COPY);
        fs.copySync(packagePaths.GOOD, packagePaths.COPY);

        let promise = cordovaSetVersion.setVersion(configPaths.COPY)
            .then(() => fs.readFile(configPaths.COPY, fileParams));

        let config = fs.readFileSync(configPaths.COPY, fileParams);
        let expectedJsonConfig = fs.readFileSync(configPaths.EXPECTED_JSON, fileParams);

        return promise.should.be.fulfilled
            .then((result) => {
                result.should.equal(expectedJsonConfig);
            });
    });

    it('should return an error about missing package file', () => {
        fs.copySync(configPaths.GOOD, configPaths.COPY);

        let promise = cordovaSetVersion.setVersion(configPaths.COPY);

        return promise.should.be.rejected
            .then((error) => {
                error.should.be.instanceOf(Error);
                error.message.should.contain('no such file or directory');
                error.message.should.contain('package.json');
            });
    });

    it('should return an error about bad package file', () => {
        fs.copySync(configPaths.GOOD, configPaths.COPY);
        fs.copySync(packagePaths.MALFORMED, packagePaths.COPY);

        let promise = cordovaSetVersion.setVersion(configPaths.COPY);

        return promise.should.be.rejected
            .then((error) => {
                error.should.be.instanceOf(Error);
                error.name.should.equal('JSONError');
                error.message.should.contain('Unexpected end of input');
                error.message.should.contain('package.json');
            });
    });

    it('should return an error about no version', () => {
        fs.copySync(configPaths.GOOD, configPaths.COPY);
        fs.copySync(packagePaths.NO_VERSION, packagePaths.COPY);

        let promise = cordovaSetVersion.setVersion(configPaths.COPY);

        return promise.should.be.rejected
            .then((error) => {
                error.should.be.instanceOf(Error);
                error.message.should.contain('no version');
                error.message.should.contain('package.json');
            });
    });

    afterEach(function () {
        if (fs.existsSync(configPaths.COPY)) {
            fs.removeSync(configPaths.COPY);
        }

        if (fs.existsSync(packagePaths.COPY)) {
            fs.removeSync(packagePaths.COPY);
        }
    });
});
