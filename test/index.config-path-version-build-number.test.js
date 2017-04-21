'use strict';

import { expect } from 'chai';
import fs from 'fs-extra';

import useFakeRethrow from './use-fake-rethrow';
import { tempConfigFile, tempProvidedConfigFile, entryConfigFiles, expectedXmlFiles } from './configs';
import { tempPackageFile, entryPackageFiles } from './packages';

function configPathVersionBuildNumberTest() {
    describe('(configPath, version, buildNumber)', () => {
        it('should not throw an error', (done) => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            let cordovaSetVersion = useFakeRethrow(done);

            expect(cordovaSetVersion.bind(null, tempProvidedConfigFile, '2.4.9', 86))
                .to.not.throw();
        });
    });
}

export default configPathVersionBuildNumberTest;
