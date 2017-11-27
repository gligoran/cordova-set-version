import { afterEach, before, describe, it } from 'mocha';
import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import chaiFiles, { file } from 'chai-files';
import fs from 'fs-extra';
import { exec } from 'child-process-promise';

import { tempConfigFile, entryConfigFiles, expectedXmlFiles } from './configs';

chai.use(chaiFiles);
chai.use(dirtyChai);

describe('cli', () => {
    before(() => {
        process.chdir(__dirname);
    });

    it('should run', async () => {
        fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

        await exec('../dist/cli.js -v 2.4.9 -b 86');

        expect(file(tempConfigFile))
            .to
            .equal(file(expectedXmlFiles.VERSION_AND_BUILD_TO_VERSION_AND_BUILD));
    });

    afterEach(() => {
        if (fs.existsSync(tempConfigFile)) {
            fs.removeSync(tempConfigFile);
        }
    });
});
