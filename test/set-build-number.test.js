'use strict';

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import fs from 'fs-promise';

import cordovaSetVersion from '../src/index';

const fileParams = { encoding: 'UTF-8' };
const configPaths = {
    COPY: './config.xml',
    GOOD: './set-build-number/configs/config.good.xml',
    WITHOUT: './set-build-number/configs/config.good.xml',
    MALFORMED: './set-build-number/configs/config.malformed.xml',
    MISSING: './set-build-number/configs/config.missing.xml',
    EXPECTED: './set-build-number/configs/config.expected.xml'
};

chai.use(chaiAsPromised);
chai.should();

describe('setBuildNumber', () => {
    before(() => {
        process.chdir(__dirname);
    });

    it('should exist', () => {
        cordovaSetVersion.should.have.property('setBuildNumber');
    });

    it('should be a function', () => {
        let type = typeof cordovaSetVersion.setBuildNumber;
        type.should.equal('function');
    });

    it('should replace existing build number attribute values', () => {
        fs.copySync(configPaths.GOOD, configPaths.COPY);

        let promise = cordovaSetVersion.setBuildNumber(configPaths.COPY, 24)
            .then(() => fs.readFile(configPaths.COPY, fileParams));

        let expectedConfig = fs.readFileSync(configPaths.EXPECTED, fileParams);

        return promise.should.be.fulfilled
            .then((result) => {
                result.should.equal(expectedConfig);
            });
    });


    it('should create build number attributes, when missing', () => {
        fs.copySync(configPaths.WITHOUT, configPaths.COPY);

        let promise = cordovaSetVersion.setBuildNumber(configPaths.COPY, 24)
            .then(() => fs.readFile(configPaths.COPY, fileParams));

        let expectedConfig = fs.readFileSync(configPaths.EXPECTED, fileParams);

        return promise.should.be.fulfilled
            .then((result) => {
                result.should.equal(expectedConfig);
            });
    });

    it('should return an error about missing config.xml file', () => {
        let promise = cordovaSetVersion.setBuildNumber(configPaths.MISSING, '1.0.0')
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

    afterEach(function () {
        if (fs.existsSync(configPaths.COPY)) {
            fs.removeSync(configPaths.COPY);
        }
    });
});
