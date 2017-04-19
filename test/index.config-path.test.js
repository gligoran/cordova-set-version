'use strict';

import { expect } from 'chai';
import fs from 'fs-extra';

import cordovaSetVersion from '../src/index';
import { tempConfigFile, tempProvidedConfigFile, entryConfigFiles, expectedXmlFiles } from './configs';
import { tempPackageFile, entryPackageFiles } from './packages';

export default () => {
    describe('(configPath)', () => {
        it('should return an error about callback type', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            try {
                cordovaSetVersion(tempProvidedConfigFile);
            } catch (error) {
                expect(error).to.exist;
                expect(error).to.be.instanceOf(TypeError);
                expect(error.message).to.contain('callback');
                expect(error.message).to.contain('must be');
            }
        });
    });
}