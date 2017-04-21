'use strict';

import { expect } from 'chai';
import fs from 'fs-extra';

import cordovaSetVersion from '../src/index';
import { tempConfigFile, tempProvidedConfigFile, entryConfigFiles, expectedXmlFiles } from './configs';
import { tempPackageFile, entryPackageFiles } from './packages';

function rethrowTest() {
    describe('rethrow', () => {
        it('should not throw an error', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            let e = expect(cordovaSetVersion.bind(null, '2.4.9'));

            setTimeout(() => {
                e.to.not.throw();
                done();
            }, 50);
        });

        it('should throw an error', (done) => {
            let e = expect(cordovaSetVersion.bind(null, {}, {}));

            setTimeout(() => {
                e.to.throw();
                done();
            }, 50);
        });
    });
}

export default rethrowTest;
