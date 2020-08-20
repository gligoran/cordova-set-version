import fs from 'fs-extra';

import readFile from '../read-file';
import cordovaSetVersion from '../../src';
import { tempConfigFile, tempProvidedConfigFile, entryConfigFiles, expectedXmlFiles } from '../configs';
import { tempPackageFile, entryPackageFiles } from '../packages';

function nullsTest() {
    describe('nulls', () => {
        it('(configPath, null)', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            await cordovaSetVersion(tempProvidedConfigFile, null);

            expect(readFile(tempProvidedConfigFile)).toBe(
                readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD),
            );
        });

        it('(configPath, null, null)', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            await cordovaSetVersion(tempProvidedConfigFile, null, null);

            expect(readFile(tempProvidedConfigFile)).toBe(
                readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD),
            );
        });

        it('(configPath, version, null)', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            await cordovaSetVersion(tempProvidedConfigFile, '2.4.9', null);

            expect(readFile(tempProvidedConfigFile)).toBe(readFile(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD));
        });

        it('(configPath, null, buildNumber)', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);

            await cordovaSetVersion(tempProvidedConfigFile, null, 86);

            expect(readFile(tempProvidedConfigFile)).toBe(readFile(expectedXmlFiles.BUILD_TO_VERSION_AND_BUILD));
        });

        it('(version, null)', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            await cordovaSetVersion('2.4.9', null);

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD));
        });

        it('(null, version)', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            await cordovaSetVersion(null, '2.4.9');

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD));
        });

        it('(null, version, null)', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            await cordovaSetVersion(null, '2.4.9', null);

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD));
        });

        it('(null, version, buildNumber)', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            await cordovaSetVersion(null, '2.4.9', 86);

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.VERSION_AND_BUILD_TO_VERSION_AND_BUILD));
        });

        it('(null, buildNumber)', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            await cordovaSetVersion(null, 86);

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.BUILD_TO_VERSION_AND_BUILD));
        });

        it('(null, null, buildNumber)', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);

            await cordovaSetVersion(null, null, 86);

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.BUILD_TO_VERSION_AND_BUILD));
        });

        it('(null)', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            await cordovaSetVersion(null);

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD));
        });

        it('(null, null)', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            await cordovaSetVersion(null, null);

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD));
        });

        it('(null, null, null)', async () => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);

            await cordovaSetVersion(null, null, null);

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD));
        });
    });
}

export default nullsTest;
