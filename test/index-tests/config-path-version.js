import fs from 'fs-extra';

import readFile from '../read-file';
import cordovaSetVersion from '../../src';
import {
  tempProvidedConfigFile,
  entryConfigFiles,
  expectedXmlFiles,
  tempProvidedPluginConfigFile,
  entryPluginConfigFiles,
  expectedPluginXmlFiles,
} from '../configs';

function configPathVersionTest() {
  describe('({ configPath, version })', () => {
    test('should override existing version and preserve existing buildNumber', async () => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

      await cordovaSetVersion({
        configPath: tempProvidedConfigFile,
        version: '2.4.9',
      });

      expect(readFile(tempProvidedConfigFile)).toBe(
        readFile(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD),
      );
    });

    test('should override existing version and not add buildNumber', async () => {
      fs.copySync(
        entryConfigFiles.VERSION_AND_NO_BUILD,
        tempProvidedConfigFile,
      );

      await cordovaSetVersion({
        configPath: tempProvidedConfigFile,
        version: '2.4.9',
      });

      expect(readFile(tempProvidedConfigFile)).toBe(
        readFile(expectedXmlFiles.VERSION_TO_VERSION_AND_NO_BUILD),
      );
    });

    test('should add version and preserve existing buildNumber', async () => {
      fs.copySync(
        entryConfigFiles.NO_VERSION_AND_BUILD,
        tempProvidedConfigFile,
      );

      await cordovaSetVersion({
        configPath: tempProvidedConfigFile,
        version: '2.4.9',
      });

      expect(readFile(tempProvidedConfigFile)).toBe(
        readFile(expectedXmlFiles.VERSION_TO_NO_VERSION_AND_BUILD),
      );
    });

    test('should add version and not add buildNumber', async () => {
      fs.copySync(
        entryConfigFiles.NO_VERSION_AND_NO_BUILD,
        tempProvidedConfigFile,
      );

      await cordovaSetVersion({
        configPath: tempProvidedConfigFile,
        version: '2.4.9',
      });

      expect(readFile(tempProvidedConfigFile)).toBe(
        readFile(expectedXmlFiles.VERSION_TO_NO_VERSION_AND_NO_BUILD),
      );
    });

    test('should return an error about configPath type', async () => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

      try {
        await cordovaSetVersion({ configPath: {}, version: '2.4.9' });
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).toContain('configPath');
        expect(error.message).not.toContain('version');
        expect(error.message).toContain('must be a');
      }
    });

    test('should return an error about version type', async () => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

      try {
        await cordovaSetVersion({
          configPath: tempProvidedConfigFile,
          version: {},
        });
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).toContain('version');
        expect(error.message).toContain('must be a');
      }
    });

    test('should return an error about missing config file', async () => {
      try {
        await cordovaSetVersion({
          configPath: tempProvidedConfigFile,
          version: '2.4.9',
        });
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).toContain('no such file or directory');
        expect(error.message).toContain('config.provided.xml');
      }
    });

    test('should return an error about malformed config file', async () => {
      fs.copySync(entryConfigFiles.MALFORMED, tempProvidedConfigFile);

      try {
        await cordovaSetVersion({
          configPath: tempProvidedConfigFile,
          version: '2.4.9',
        });
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).not.toContain('no such file or directory');
      }
    });
  });

  describe('({ pluginConfigPath, version })', () => {
    test('should override existing version', async () => {
      fs.copySync(entryPluginConfigFiles.VERSION, tempProvidedPluginConfigFile);

      await cordovaSetVersion({
        configPath: tempProvidedPluginConfigFile,
        version: '2.4.9',
      });

      expect(readFile(tempProvidedPluginConfigFile)).toBe(
        readFile(expectedPluginXmlFiles.VERSION_TO_VERSION),
      );
    });

    test('should add version', async () => {
      fs.copySync(
        entryPluginConfigFiles.NO_VERSION,
        tempProvidedPluginConfigFile,
      );

      await cordovaSetVersion({
        configPath: tempProvidedPluginConfigFile,
        version: '2.4.9',
      });

      expect(readFile(tempProvidedPluginConfigFile)).toBe(
        readFile(expectedPluginXmlFiles.VERSION_TO_NO_VERSION),
      );
    });

    test('should return an error about pluginConfigPath type', async () => {
      fs.copySync(entryPluginConfigFiles.VERSION, tempProvidedPluginConfigFile);

      try {
        await cordovaSetVersion({ configPath: {}, version: '2.4.9' });
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).toContain('configPath');
        expect(error.message).not.toContain('version');
        expect(error.message).toContain('must be a');
      }
    });

    test('should return an error about version type', async () => {
      fs.copySync(entryPluginConfigFiles.VERSION, tempProvidedPluginConfigFile);

      try {
        await cordovaSetVersion({
          configPath: tempProvidedPluginConfigFile,
          version: {},
        });
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).toContain('version');
        expect(error.message).toContain('must be a');
      }
    });

    test('should return an error about missing config file', async () => {
      try {
        await cordovaSetVersion({
          configPath: tempProvidedPluginConfigFile,
          version: '2.4.9',
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
        tempProvidedPluginConfigFile,
      );

      try {
        await cordovaSetVersion({
          configPath: tempProvidedPluginConfigFile,
          version: '2.4.9',
        });
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).not.toContain('no such file or directory');
      }
    });
  });
}

export default configPathVersionTest;
