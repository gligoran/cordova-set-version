import { fileURLToPath } from 'node:url';
import process from 'node:process';
import path from 'node:path';
import fs from 'fs-extra';
import { exec } from 'child-process-promise';

import readFile from './read-file.js';
import {
  temporaryConfigFile,
  entryConfigFiles,
  expectedXmlFiles,
} from './configs/index.js';

describe('cli', () => {
  beforeAll(() => {
    process.chdir(path.dirname(fileURLToPath(import.meta.url)));
  });

  test('should run', async () => {
    fs.copySync(entryConfigFiles.VERSION_AND_BUILD, temporaryConfigFile);

    await exec('../cli.js -v 2.4.9 -b 86');

    expect(readFile(temporaryConfigFile)).toBe(
      readFile(expectedXmlFiles.VERSION_AND_BUILD_TO_VERSION_AND_BUILD),
    );
  });

  afterEach(() => {
    if (fs.existsSync(temporaryConfigFile)) {
      fs.removeSync(temporaryConfigFile);
    }
  });
});
