import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import process from 'node:process';
import path from 'node:path';
import fs from 'fs-extra';
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

  test('should run', () => {
    fs.copySync(entryConfigFiles.VERSION_AND_BUILD, temporaryConfigFile);

    execSync('../cli.js -v 2.4.9 -b 86');

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
