import { describe, it } from 'mocha';
import { expect } from 'chai';
import fs from 'fs-extra';

import cordovaSetVersion from '../src/index';
import { tempConfigFile, entryConfigFiles } from './configs';

function rethrowTest() {
    describe('rethrow', () => {
        it('should not throw an error', done => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            const e = expect(cordovaSetVersion.bind(null, '2.4.9'));

            setTimeout(() => {
                e.to.not.throw();
                done();
            }, 50);
        });

        it('should throw an error', done => {
            const e = expect(cordovaSetVersion.bind(null, {}, {}));

            setTimeout(() => {
                e.to.throw();
                done();
            }, 50);
        });
    });
}

export default rethrowTest;
