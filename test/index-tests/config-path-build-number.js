import fs from 'fs-extra';
import readFile from '../read-file.js';
import cordovaSetVersion from '../../index.js';
import {
  temporaryProvidedConfigFile,
  entryConfigFiles,
  expectedXmlFiles,
} from '../configs/index.js';

function configPathBuildNumberTest() {
  describe('({ configPath, buildNumber })', () => {
    test('should override existing buildNumber and preserve existing version', async () => {
      fs.copySync(
        entryConfigFiles.VERSION_AND_BUILD,
        temporaryProvidedConfigFile,
      );

      await cordovaSetVersion({
        configPath: temporaryProvidedConfigFile,
        buildNumber: 86,
      });

      expect(readFile(temporaryProvidedConfigFile)).toBe(
        readFile(expectedXmlFiles.BUILD_TO_VERSION_AND_BUILD),
      );
    });

    test('should add buildNumber and preserve existing version', async () => {
      fs.copySync(
        entryConfigFiles.VERSION_AND_NO_BUILD,
        temporaryProvidedConfigFile,
      );

      await cordovaSetVersion({
        configPath: temporaryProvidedConfigFile,
        buildNumber: 86,
      });

      expect(readFile(temporaryProvidedConfigFile)).toBe(
        readFile(expectedXmlFiles.BUILD_TO_VERSION_AND_NO_BUILD),
      );
    });

    test('should override existing buildNumber and not add version', async () => {
      fs.copySync(
        entryConfigFiles.NO_VERSION_AND_BUILD,
        temporaryProvidedConfigFile,
      );

      await cordovaSetVersion({
        configPath: temporaryProvidedConfigFile,
        buildNumber: 86,
      });

      expect(readFile(temporaryProvidedConfigFile)).toBe(
        readFile(expectedXmlFiles.BUILD_TO_NO_VERSION_AND_BUILD),
      );
    });

    test('should add buildNumber and not add version', async () => {
      fs.copySync(
        entryConfigFiles.NO_VERSION_AND_NO_BUILD,
        temporaryProvidedConfigFile,
      );

      await cordovaSetVersion({
        configPath: temporaryProvidedConfigFile,
        buildNumber: 86,
      });

      expect(readFile(temporaryProvidedConfigFile)).toBe(
        readFile(expectedXmlFiles.BUILD_TO_NO_VERSION_AND_NO_BUILD),
      );
    });

    test('should return an error about configPath type', async () => {
      fs.copySync(
        entryConfigFiles.VERSION_AND_BUILD,
        temporaryProvidedConfigFile,
      );

      try {
        await cordovaSetVersion({ configPath: {}, buildNumber: 86 });
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).toContain('configPath');
        expect(error.message).toContain('must be a');
      }
    });

    test('should return an error about buildNumber type', async () => {
      fs.copySync(
        entryConfigFiles.VERSION_AND_BUILD,
        temporaryProvidedConfigFile,
      );

      try {
        await cordovaSetVersion({
          configPath: temporaryProvidedConfigFile,
          buildNumber: {},
        });
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).toContain('buildNumber');
        expect(error.message).toContain('must be a');
      }
    });

    test('should return an error about missing config file', async () => {
      try {
        await cordovaSetVersion({
          configPath: temporaryProvidedConfigFile,
          buildNumber: 86,
        });
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).toContain('no such file or directory');
        expect(error.message).toContain('config.provided.xml');
      }
    });

    test('should return an error about malformed config file', async () => {
      fs.copySync(entryConfigFiles.MALFORMED, temporaryProvidedConfigFile);

      try {
        await cordovaSetVersion({
          configPath: temporaryProvidedConfigFile,
          buildNumber: 86,
        });
      } catch (error) {
        expect(error).not.toBeNil();
        expect(error.message).not.toContain('no such file or directory');
      }
    });
  });
}

export default configPathBuildNumberTest;
