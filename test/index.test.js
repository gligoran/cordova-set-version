import { afterEach, before, describe, it } from 'mocha';
import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
import fs from 'fs-extra';

import cordovaSetVersion from '../src/index';
import { tempConfigFile, tempProvidedConfigFile } from './configs';
import { tempPackageFile } from './packages';

import configPathVersionBuildNumberTest from './index.config-path-version-build-number.test';
import configPathVersionTest from './index.config-path-version.test';
import configPathBuildNumberTest from './index.config-path-build-number.test';
import configPathTest from './index.config-path.test';
import versionBuildNumberTest from './index.version-build-number.test';
import versionTest from './index.version.test';
import buildNumberTest from './index.build-number.test';
import noArgumentsTest from './index.no-arguments.test';
import nullsTest from './index.nulls.test';

chai.use(dirtyChai);

describe('cordova-set-version', () => {
    before(() => {
        process.chdir(__dirname);
    });

    it('should exist', () => {
        expect(cordovaSetVersion).to.exist();
    });

    it('should be a function', () => {
        expect(cordovaSetVersion).to.be.a('function');
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

        if (fs.existsSync(tempPackageFile)) {
            fs.removeSync(tempPackageFile);
        }
    });
});
