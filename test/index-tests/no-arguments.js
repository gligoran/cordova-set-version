import fs from 'fs-extra';
import readFile from '../read-file.js';
import cordovaSetVersion from '../../index.js';
import {
  temporaryConfigFile,
  entryConfigFiles,
  expectedXmlFiles,
} from '../configs/index.js';
import { temporaryPackageFile, entryPackageFiles } from '../packages/index.js';

function noArgumentsTest() {
  describe('()', () => {
    test('should override existing version and preserve existing buildNumber', async () => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, temporaryConfigFile);
      fs.copySync(entryPackageFiles.GOOD, temporaryPackageFile);

      await cordovaSetVersion();

      expect(readFile(temporaryConfigFile)).toBe(
        readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD),
      );
    });

    test('should override existing version and not add buildNumber', async () => {
      fs.copySync(entryConfigFiles.VERSION_AND_NO_BUILD, temporaryConfigFile);
      fs.copySync(entryPackageFiles.GOOD, temporaryPackageFile);

      await cordovaSetVersion();

      expect(readFile(temporaryConfigFile)).toBe(
        readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_NO_BUILD),
      );
    });

    test('should add version and preserve existing buildNumber', async () => {
      fs.copySync(entryConfigFiles.NO_VERSION_AND_BUILD, temporaryConfigFile);
      fs.copySync(entryPackageFiles.GOOD, temporaryPackageFile);

      await cordovaSetVersion();

      expect(readFile(temporaryConfigFile)).toBe(
        readFile(expectedXmlFiles.PACKAGE_VERSION_TO_NO_VERSION_AND_BUILD),
      );
    });

    test('should add version and not add buildNumber', async () => {
      fs.copySync(
        entryConfigFiles.NO_VERSION_AND_NO_BUILD,
        temporaryConfigFile,
      );
      fs.copySync(entryPackageFiles.GOOD, temporaryPackageFile);

      await cordovaSetVersion();

      expect(readFile(temporaryConfigFile)).toBe(
        readFile(expectedXmlFiles.PACKAGE_VERSION_TO_NO_VERSION_AND_NO_BUILD),
      );
    });

    test('should return an error about missing config file', async () => {
      try {
        await cordovaSetVersion(temporaryConfigFile);
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).toContain('no such file or directory');
        expect(error.message).toContain('config.xml');
      }
    });

    test('should return an error about malformed config file', async () => {
      fs.copySync(entryConfigFiles.MALFORMED, temporaryConfigFile);
      fs.copySync(entryPackageFiles.GOOD, temporaryPackageFile);

      try {
        await cordovaSetVersion();
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).not.toContain('no such file or directory');
      }
    });

    test('should return an error about missing package file', async () => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, temporaryConfigFile);

      try {
        await cordovaSetVersion();
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).toContain('no such file or directory');
        expect(error.message).toContain('package.json');
      }
    });

    test('should return an error about malformed package file', async () => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, temporaryConfigFile);
      fs.copySync(entryPackageFiles.MALFORMED, temporaryPackageFile);

      try {
        await cordovaSetVersion();
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).not.toContain('no such file or directory');
      }
    });
  });
}

export default noArgumentsTest;
