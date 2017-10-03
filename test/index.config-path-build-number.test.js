import { describe, it } from 'mocha';
import { expect } from 'chai';
import fs from 'fs-extra';

import useFakeRethrow from './use-fake-rethrow';
import { tempProvidedConfigFile, entryConfigFiles } from './configs';

function configPathBuildNumberTest() {
    describe('(configPath, buildNumber)', () => {
        it('should not throw an error', done => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            const cordovaSetVersion = useFakeRethrow(done);

            expect(cordovaSetVersion.bind(null, tempProvidedConfigFile, 86)).to.not.throw();
        });
    });
}

export default configPathBuildNumberTest;
