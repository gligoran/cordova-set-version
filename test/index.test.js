'use strict';

import chai from 'chai';

import cordovaSetVersion from '../src/index';

chai.should();

describe('cordova-set-version', () => {
    before(() => {
        process.chdir(__dirname);
    });

    it('should exist', () => {
        cordovaSetVersion.should.exist;
    });
});
