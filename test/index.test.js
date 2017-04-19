'use strict';

import { expect } from 'chai';
import fs from 'fs-extra';

import cordovaSetVersion from '../src/index';
import { tempConfigFile, tempProvidedConfigFile } from './configs';
import { tempPackageFile } from './packages';

import configPathVersionBuildNumberCallbackTest from './index.config-path-version-build-number-callback.test';
import configPathVersionBuildNumberTest from './index.config-path-version-build-number.test';
import configPathVersionCallbackTest from './index.config-path-version-callback.test';
import configPathVersionTest from './index.config-path-version.test';
import configPathBuildNumberCallbackTest from './index.config-path-build-number-callback.test';
import configPathBuildNumberTest from './index.config-path-build-number.test';
import configPathCallbackTest from './index.config-path-callback.test';
import configPathTest from './index.config-path.test';
import versionBuildNumberCallbackTest from './index.version-build-number-callback.test';
import versionBuildNumberTest from './index.version-build-number.test';
import versionCallbackTest from './index.version-callback.test';
import versionTest from './index.version.test';
import buildNumberCallbackTest from './index.build-number-callback.test';
import buildNumberTest from './index.build-number.test';
import callbackTest from './index.callback.test';
import noArgumentsTest from './index.no-arguments.test';
import nullsTest from './index.nulls.test';

describe('cordova-set-version', () => {
    before(() => {
        process.chdir(__dirname);
    });

    it('should exist', () => {
        expect(cordovaSetVersion).to.exist;
    });

    it('should be a functon', () => {
        expect(typeof cordovaSetVersion).to.equal('function');
    });

    configPathVersionBuildNumberCallbackTest();
    configPathVersionBuildNumberTest();
    configPathVersionCallbackTest();
    configPathVersionTest();
    configPathBuildNumberCallbackTest();
    configPathBuildNumberTest();
    configPathCallbackTest();
    configPathTest();
    versionBuildNumberCallbackTest();
    versionBuildNumberTest();
    versionCallbackTest();
    versionTest();
    buildNumberCallbackTest();
    buildNumberTest();
    callbackTest();
    noArgumentsTest();
    nullsTest();

    afterEach(() => {
        if (fs.existsSync(tempConfigFile)) {
            fs.removeSync(tempConfigFile);
        }

        if (fs.existsSync(tempProvidedConfigFile)) {
            fs.removeSync(tempProvidedConfigFile);
        }

        if (fs.existsSync(tempPackageFile)) {
            fs.removeSync(tempPackageFile);
        }
    });
});
