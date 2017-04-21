'use strict';

import chai from 'chai';
import chaiFiles from 'chai-files';
import fs from 'fs-extra';

import useFakeRethrow from './use-fake-rethrow';
import { tempConfigFile, tempProvidedConfigFile, entryConfigFiles, expectedXmlFiles } from './configs';
import { tempPackageFile, entryPackageFiles } from './packages';

chai.use(chaiFiles);
const expect = chai.expect;
const file = chaiFiles.file;

function configPathTest() {
    describe('(configPath)', () => {
        it('should not throw an error', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            let cordovaSetVersion = useFakeRethrow(done);

            expect(cordovaSetVersion.bind(null, tempProvidedConfigFile))
                .to.not.throw();
        });
    });
}

export default configPathTest;
