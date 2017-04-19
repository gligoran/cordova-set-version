'use strict';

import { expect } from 'chai';
import fs from 'fs-extra';

import cordovaSetVersion from '../src/index';
import { tempConfigFile, tempProvidedConfigFile, entryConfigFiles, expectedXmlFiles } from './configs';
import { tempPackageFile, entryPackageFiles } from './packages';

export default () => {
    describe('(configPath, version, buildNumber)', () => {
        it('should return an error about callback type', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            expect(cordovaSetVersion.bind(null, tempProvidedConfigFile, '2.4.9', 86))
                .to.throw(TypeError)
                .that.has.property('message')
                .that.contains('callback')
                .that.contains('must be');
        });
    });
}
