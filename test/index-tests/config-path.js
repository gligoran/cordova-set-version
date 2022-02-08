import fs from 'fs-extra';

import readFile from '../read-file.js';
import cordovaSetVersion from '../../index.js';
import {
  temporaryProvidedConfigFile,
  entryConfigFiles,
  expectedXmlFiles,
  temporaryProvidedPluginConfigFile,
  entryPluginConfigFiles,
  expectedPluginXmlFiles,
} from '../configs/index.js';
import { temporaryPackageFile, entryPackageFiles } from '../packages/index.js';

function configPathTest() {
  describe('({ configPath })', () => {
    test('should override existing version and preserve existing buildNumber', async () => {
      fs.copySync(
        entryConfigFiles.VERSION_AND_BUILD,
        temporaryProvidedConfigFile,
      );
      fs.copySync(entryPackageFiles.GOOD, temporaryPackageFile);

      await cordovaSetVersion({ configPath: temporaryProvidedConfigFile });

      expect(readFile(temporaryProvidedConfigFile)).toBe(
        readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD),
      );
    });

    test('should override existing version and not add buildNumber', async () => {
      fs.copySync(
        entryConfigFiles.VERSION_AND_NO_BUILD,
        temporaryProvidedConfigFile,
      );
      fs.copySync(entryPackageFiles.GOOD, temporaryPackageFile);

      await cordovaSetVersion({ configPath: temporaryProvidedConfigFile });

      expect(readFile(temporaryProvidedConfigFile)).toBe(
        readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_NO_BUILD),
      );
    });

    test('should add version and preserve existing buildNumber', async () => {
      fs.copySync(
        entryConfigFiles.NO_VERSION_AND_BUILD,
        temporaryProvidedConfigFile,
      );
      fs.copySync(entryPackageFiles.GOOD, temporaryPackageFile);

      await cordovaSetVersion({ configPath: temporaryProvidedConfigFile });

      expect(readFile(temporaryProvidedConfigFile)).toBe(
        readFile(expectedXmlFiles.PACKAGE_VERSION_TO_NO_VERSION_AND_BUILD),
      );
    });

    test('should add version and not add buildNumber', async () => {
      fs.copySync(
        entryConfigFiles.NO_VERSION_AND_NO_BUILD,
        temporaryProvidedConfigFile,
      );
      fs.copySync(entryPackageFiles.GOOD, temporaryPackageFile);

      await cordovaSetVersion({ configPath: temporaryProvidedConfigFile });

      expect(readFile(temporaryProvidedConfigFile)).toBe(
        readFile(expectedXmlFiles.PACKAGE_VERSION_TO_NO_VERSION_AND_NO_BUILD),
      );
    });

    test('should return an error about configPath type', async () => {
      fs.copySync(
        entryConfigFiles.VERSION_AND_BUILD,
        temporaryProvidedConfigFile,
      );

      try {
        await cordovaSetVersion({ configPath: {} });
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).toContain('configPath');
        expect(error.message).toContain('must be a');
      }
    });

    test('should return an error about missing config file', async () => {
      try {
        await cordovaSetVersion({ configPath: temporaryProvidedConfigFile });
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).toContain('no such file or directory');
        expect(error.message).toContain('config.provided.xml');
      }
    });

    test('should return an error about malformed config file', async () => {
      fs.copySync(entryConfigFiles.MALFORMED, temporaryProvidedConfigFile);
      fs.copySync(entryPackageFiles.GOOD, temporaryPackageFile);

      try {
        await cordovaSetVersion({ configPath: temporaryProvidedConfigFile });
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).not.toContain('no such file or directory');
      }
    });

    test('should return an error about missing package file', async () => {
      fs.copySync(
        entryConfigFiles.VERSION_AND_BUILD,
        temporaryProvidedConfigFile,
      );
      try {
        await cordovaSetVersion({ configPath: temporaryProvidedConfigFile });
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).toContain('no such file or directory');
        expect(error.message).toContain('package.json');
      }
    });

    test('should return an error about malformed package file', async () => {
      fs.copySync(
        entryConfigFiles.VERSION_AND_BUILD,
        temporaryProvidedConfigFile,
      );
      fs.copySync(entryPackageFiles.MALFORMED, temporaryPackageFile);

      try {
        await cordovaSetVersion({ configPath: temporaryProvidedConfigFile });
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).not.toContain('no such file or directory');
      }
    });
  });

  describe('({ pluginConfigPath })', () => {
    test('should override existing version', async () => {
      fs.copySync(
        entryPluginConfigFiles.VERSION,
        temporaryProvidedPluginConfigFile,
      );
      fs.copySync(entryPackageFiles.GOOD, temporaryPackageFile);

      await cordovaSetVersion({
        configPath: temporaryProvidedPluginConfigFile,
      });

      expect(readFile(temporaryProvidedPluginConfigFile)).toBe(
        readFile(expectedPluginXmlFiles.PACKAGE_VERSION_TO_VERSION),
      );
    });

    test('should add version', async () => {
      fs.copySync(
        entryPluginConfigFiles.NO_VERSION,
        temporaryProvidedPluginConfigFile,
      );
      fs.copySync(entryPackageFiles.GOOD, temporaryPackageFile);

      await cordovaSetVersion({
        configPath: temporaryProvidedPluginConfigFile,
      });

      expect(readFile(temporaryProvidedPluginConfigFile)).toBe(
        readFile(expectedPluginXmlFiles.PACKAGE_VERSION_TO_NO_VERSION),
      );
    });

    test('should return an error about pluginConfigPath type', async () => {
      fs.copySync(
        entryPluginConfigFiles.VERSION,
        temporaryProvidedPluginConfigFile,
      );

      try {
        await cordovaSetVersion({ configPath: {} });
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).toContain('configPath');
        expect(error.message).toContain('must be a');
      }
    });

    test('should return an error about missing config file', async () => {
      try {
        await cordovaSetVersion({
          configPath: temporaryProvidedPluginConfigFile,
        });
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).toContain('no such file or directory');
        expect(error.message).toContain('plugin.provided.xml');
      }
    });

    test('should return an error about malformed config file', async () => {
      fs.copySync(
        entryPluginConfigFiles.MALFORMED,
        temporaryProvidedPluginConfigFile,
      );
      fs.copySync(entryPackageFiles.GOOD, temporaryPackageFile);

      try {
        await cordovaSetVersion({
          configPath: temporaryProvidedPluginConfigFile,
        });
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).not.toContain('no such file or directory');
      }
    });

    test('should return an error about missing package file', async () => {
      fs.copySync(
        entryPluginConfigFiles.VERSION,
        temporaryProvidedPluginConfigFile,
      );
      try {
        await cordovaSetVersion({
          configPath: temporaryProvidedPluginConfigFile,
        });
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).toContain('no such file or directory');
        expect(error.message).toContain('package.json');
      }
    });

    test('should return an error about malformed package file', async () => {
      fs.copySync(
        entryPluginConfigFiles.VERSION,
        temporaryProvidedPluginConfigFile,
      );
      fs.copySync(entryPackageFiles.MALFORMED, temporaryPackageFile);

      try {
        await cordovaSetVersion({
          configPath: temporaryProvidedPluginConfigFile,
        });
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).not.toContain('no such file or directory');
      }
    });
  });
}

export default configPathTest;
