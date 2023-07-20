import { fileURLToPath } from 'node:url';
import path from 'node:path';
import process from 'node:process';
import fs from 'fs-extra';
import cordovaSetVersion from '../index.js';
import {
  temporaryConfigFile,
  temporaryProvidedConfigFile,
  temporaryProvidedPluginConfigFile,
} from './configs/index.js';
import { temporaryPackageFile } from './packages/index.js';
import configPathVersionBuildNumberTest from './index-tests/config-path-version-build-number.js';
import configPathVersionTest from './index-tests/config-path-version.js';
import configPathBuildNumberTest from './index-tests/config-path-build-number.js';
import configPathTest from './index-tests/config-path.js';
import versionBuildNumberTest from './index-tests/version-build-number.js';
import versionTest from './index-tests/version.js';
import buildNumberTest from './index-tests/build-number.js';
import noArgumentsTest from './index-tests/no-arguments.js';
import nullsTest from './index-tests/nulls.js';

describe('cordova-set-version', () => {
  beforeAll(() => {
    process.chdir(path.dirname(fileURLToPath(import.meta.url)));
  });

  test('should exist', () => {
    expect(cordovaSetVersion).not.toBeNil();
  });

  test('should be a function', () => {
    expect(cordovaSetVersion).toBeFunction();
  });

  configPathVersionBuildNumberTest();
  configPathVersionTest();
  configPathBuildNumberTest();
  configPathTest();
  versionBuildNumberTest();
  versionTest();
  buildNumberTest();
  noArgumentsTest();
  nullsTest();

  afterEach(() => {
    if (fs.existsSync(temporaryConfigFile)) {
      fs.removeSync(temporaryConfigFile);
    }

    if (fs.existsSync(temporaryProvidedConfigFile)) {
      fs.removeSync(temporaryProvidedConfigFile);
    }

    if (fs.existsSync(temporaryProvidedPluginConfigFile)) {
      fs.removeSync(temporaryProvidedPluginConfigFile);
    }

    if (fs.existsSync(temporaryPackageFile)) {
      fs.removeSync(temporaryPackageFile);
    }
  });
});
