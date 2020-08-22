import fs from 'fs-extra';
import { exec } from 'child-process-promise';

import readFile from './read-file';
import { tempConfigFile, entryConfigFiles, expectedXmlFiles } from './configs';

describe('cli', () => {
    beforeAll(() => {
        process.chdir(__dirname);
    });

    test('should run', async () => {
        fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

        await exec('../dist/cli.js -v 2.4.9 -b 86');

        expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.VERSION_AND_BUILD_TO_VERSION_AND_BUILD));
    });

    afterEach(() => {
        if (fs.existsSync(tempConfigFile)) {
            fs.removeSync(tempConfigFile);
        }
    });
});
