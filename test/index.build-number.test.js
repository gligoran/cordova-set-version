import { describe, it } from 'mocha';
import { expect } from 'chai';
import fs from 'fs-extra';

import cordovaSetVersion from '../src/index';
import { tempConfigFile, entryConfigFiles } from './configs';

function buildNumberTest() {
    describe('(buildNumber)', () => {
        it('should not throw an error', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            expect(cordovaSetVersion.bind(null, 86)).to.not.throw();
        });

        it('should throw an error about buildNumber type', () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            expect(cordovaSetVersion.bind(null, 86.9))
                .to.throw(TypeError)
                .to.have.property('message')
                .that.contains('buildNumber')
                .that.contains('must be an');
        });
    });
}

export default buildNumberTest;
