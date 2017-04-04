var expect = require('chai').expect;
var cordovaSetVersion = require('../src/index');
var fs = require('fs-extra');

var originalPath = './test/config.original.xml';
var configPath = './test/config.xml';
var expectedConfigPath = './test/config.expected.xml';
var fileParams = { encoding: 'UTF-8' };

describe('cordova-set-version', () => {
    it('should exist', () => {
        expect(cordovaSetVersion).to.exist;
    });

    describe('setVersion', () => {
        beforeEach(() => {
            fs.copySync(originalPath, configPath);
        });

        it('should exist', () => {
            expect(cordovaSetVersion).to.have.property('setVersion');
        });

        it('should be a function', () => {
            expect(typeof cordovaSetVersion.setVersion).to.equal('function');
        });

        it('should produce same content as in `config.expected.xml` when passed the argument `1.0.0`', (done) => {
            cordovaSetVersion.setVersion(configPath, '1.0.0', function (error) {
                expect(error).to.not.exist;

                var config = fs.readFileSync(configPath, fileParams);
                var expectedConfig = fs.readFileSync(expectedConfigPath, fileParams);
                expect(config).to.equal(expectedConfig);

                done();
            });
        });
    });
});
