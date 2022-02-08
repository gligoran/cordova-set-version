import fs from 'fs-extra';
import * as matchers from 'jest-extended';

import cordovaSetVersion from '../src';
import { tempConfigFile, tempProvidedConfigFile, tempProvidedPluginConfigFile } from './configs';
import { tempPackageFile } from './packages';

import configPathVersionBuildNumberTest from './index-tests/config-path-version-build-number';
import configPathVersionTest from './index-tests/config-path-version';
import configPathBuildNumberTest from './index-tests/config-path-build-number';
import configPathTest from './index-tests/config-path';
import versionBuildNumberTest from './index-tests/version-build-number';
import versionTest from './index-tests/version';
import buildNumberTest from './index-tests/build-number';
import noArgumentsTest from './index-tests/no-arguments';
import nullsTest from './index-tests/nulls';

expect.extend(matchers);

describe('cordova-set-version', () => {
    beforeAll(() => {
        process.chdir(__dirname);
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
        if (fs.existsSync(tempConfigFile)) {
            fs.removeSync(tempConfigFile);
        }

        if (fs.existsSync(tempProvidedConfigFile)) {
            fs.removeSync(tempProvidedConfigFile);
        }

        if (fs.existsSync(tempProvidedPluginConfigFile)) {
            fs.removeSync(tempProvidedPluginConfigFile);
        }

        if (fs.existsSync(tempPackageFile)) {
            fs.removeSync(tempPackageFile);
        }
    });
});
