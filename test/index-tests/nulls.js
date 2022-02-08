import fs from 'fs-extra';

import readFile from '../read-file.js';
import cordovaSetVersion from '../../index.js';
import {
  temporaryConfigFile,
  temporaryProvidedConfigFile,
  entryConfigFiles,
  expectedXmlFiles,
} from '../configs/index.js';
import { temporaryPackageFile, entryPackageFiles } from '../packages/index.js';

function nullsTest() {
  describe('nulls', () => {
    beforeEach(() => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, temporaryConfigFile);
      fs.copySync(
        entryConfigFiles.VERSION_AND_BUILD,
        temporaryProvidedConfigFile,
      );
      fs.copySync(entryPackageFiles.GOOD, temporaryPackageFile);
    });

    test('({})', async () => {
      await cordovaSetVersion({});

      expect(readFile(temporaryConfigFile)).toBe(
        readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD),
      );
    });

    test('({ buildNumber: null })', async () => {
      await cordovaSetVersion({ buildNumber: null });

      expect(readFile(temporaryConfigFile)).toBe(
        readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD),
      );
    });

    test('({ version: null })', async () => {
      await cordovaSetVersion({ buildNumber: null });

      expect(readFile(temporaryConfigFile)).toBe(
        readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD),
      );
    });

    test('({ version: null, buildNumber: null })', async () => {
      await cordovaSetVersion({ version: null, buildNumber: null });

      expect(readFile(temporaryConfigFile)).toBe(
        readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD),
      );
    });

    test('({ version: null, buildNumber: 86 })', async () => {
      await cordovaSetVersion({ version: null, buildNumber: 86 });

      expect(readFile(temporaryConfigFile)).toBe(
        readFile(expectedXmlFiles.BUILD_TO_VERSION_AND_BUILD),
      );
    });

    test("({ version: '2.4.9', buildNumber: null })", async () => {
      await cordovaSetVersion({ version: '2.4.9', buildNumber: null });

      expect(readFile(temporaryConfigFile)).toBe(
        readFile(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD),
      );
    });

    test('({ configPath: null })', async () => {
      await cordovaSetVersion({ configPath: null });

      expect(readFile(temporaryConfigFile)).toBe(
        readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD),
      );
    });

    test('({ configPath: null, buildNumber: null })', async () => {
      await cordovaSetVersion({ configPath: null, buildNumber: null });

      expect(readFile(temporaryConfigFile)).toBe(
        readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD),
      );
    });

    test('({ configPath: null, buildNumber: 86 })', async () => {
      await cordovaSetVersion({ configPath: null, buildNumber: 86 });

      expect(readFile(temporaryConfigFile)).toBe(
        readFile(expectedXmlFiles.BUILD_TO_VERSION_AND_BUILD),
      );
    });

    test('({ configPath: null, version: null })', async () => {
      await cordovaSetVersion({ configPath: null, version: null });

      expect(readFile(temporaryConfigFile)).toBe(
        readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD),
      );
    });

    test('({ configPath: null, version: null, buildNumber: null })', async () => {
      await cordovaSetVersion({
        configPath: null,
        version: null,
        buildNumber: null,
      });

      expect(readFile(temporaryConfigFile)).toBe(
        readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD),
      );
    });

    test('({ configPath: null, version: null, buildNumber: 86 })', async () => {
      await cordovaSetVersion({
        configPath: null,
        version: null,
        buildNumber: 86,
      });

      expect(readFile(temporaryConfigFile)).toBe(
        readFile(expectedXmlFiles.BUILD_TO_VERSION_AND_BUILD),
      );
    });

    test("({ configPath: null, version: '2.4.9' })", async () => {
      await cordovaSetVersion({ configPath: null, version: '2.4.9' });

      expect(readFile(temporaryConfigFile)).toBe(
        readFile(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD),
      );
    });

    test("({ configPath: null, version: '2.4.9', buildNumber: null })", async () => {
      await cordovaSetVersion({
        configPath: null,
        version: '2.4.9',
        buildNumber: null,
      });

      expect(readFile(temporaryConfigFile)).toBe(
        readFile(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD),
      );
    });

    test("({ configPath: null, version: '2.4.9', buildNumber: 86 })", async () => {
      await cordovaSetVersion({
        configPath: null,
        version: '2.4.9',
        buildNumber: 86,
      });

      expect(readFile(temporaryConfigFile)).toBe(
        readFile(expectedXmlFiles.VERSION_AND_BUILD_TO_VERSION_AND_BUILD),
      );
    });

    test('({ configPath: temporaryProvidedConfigFile, buildNumber: null })', async () => {
      await cordovaSetVersion({
        configPath: temporaryProvidedConfigFile,
        buildNumber: null,
      });

      expect(readFile(temporaryProvidedConfigFile)).toBe(
        readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD),
      );
    });

    test('({ configPath: temporaryProvidedConfigFile, version: null })', async () => {
      await cordovaSetVersion({
        configPath: temporaryProvidedConfigFile,
        version: null,
      });

      expect(readFile(temporaryProvidedConfigFile)).toBe(
        readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD),
      );
    });

    test('({ configPath: temporaryProvidedConfigFile, version: null, buildNumber: null })', async () => {
      await cordovaSetVersion({
        configPath: temporaryProvidedConfigFile,
        version: null,
        buildNumber: null,
      });

      expect(readFile(temporaryProvidedConfigFile)).toBe(
        readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD),
      );
    });

    test('({ configPath: temporaryProvidedConfigFile, version: null, buildNumber: 86 })', async () => {
      await cordovaSetVersion({
        configPath: temporaryProvidedConfigFile,
        version: null,
        buildNumber: 86,
      });

      expect(readFile(temporaryProvidedConfigFile)).toBe(
        readFile(expectedXmlFiles.BUILD_TO_VERSION_AND_BUILD),
      );
    });

    test("({ configPath: temporaryProvidedConfigFile, version: '2.4.9', buildNumber: null })", async () => {
      await cordovaSetVersion({
        configPath: temporaryProvidedConfigFile,
        version: '2.4.9',
        buildNumber: null,
      });

      expect(readFile(temporaryProvidedConfigFile)).toBe(
        readFile(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD),
      );
    });
  });
}

export default nullsTest;
