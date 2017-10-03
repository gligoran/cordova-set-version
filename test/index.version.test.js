import { describe, it } from 'mocha';
import { expect } from 'chai';
import fs from 'fs-extra';

import useFakeRethrow from './use-fake-rethrow';
import { tempConfigFile, entryConfigFiles } from './configs';
import { tempPackageFile, entryPackageFiles } from './packages';

function versionTest() {
    describe('(version)', () => {
        it('should not throw an error', done => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            const cordovaSetVersion = useFakeRethrow(done);

            expect(cordovaSetVersion.bind(null, '2.4.9')).to.not.throw();
        });
    });
}

export default versionTest;
