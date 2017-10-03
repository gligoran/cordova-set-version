import { describe, it } from 'mocha';
import { expect } from 'chai';
import fs from 'fs-extra';

import useFakeRethrow from './use-fake-rethrow';
import { tempProvidedConfigFile, entryConfigFiles } from './configs';
import { tempPackageFile, entryPackageFiles } from './packages';

function configPathTest() {
    describe('(configPath)', () => {
        it('should not throw an error', done => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            const cordovaSetVersion = useFakeRethrow(done);

            expect(cordovaSetVersion.bind(null, tempProvidedConfigFile)).to.not.throw();
        });
    });
}

export default configPathTest;
