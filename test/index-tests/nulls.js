import fs from 'fs-extra';

import readFile from '../read-file';
import cordovaSetVersion from '../../src';
import { tempConfigFile, tempProvidedConfigFile, entryConfigFiles, expectedXmlFiles } from '../configs';
import { tempPackageFile, entryPackageFiles } from '../packages';

function nullsTest() {
    describe('nulls', () => {
        beforeEach(() => {
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile);
            fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile);
            fs.copySync(entryPackageFiles.GOOD, tempPackageFile);
        });

        it('({})', async () => {
            await cordovaSetVersion({});

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD));
        });

        it('({ buildNumber: null })', async () => {
            await cordovaSetVersion({ buildNumber: null });

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD));
        });

        it('({ version: null })', async () => {
            await cordovaSetVersion({ buildNumber: null });

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD));
        });

        it('({ version: null, buildNumber: null })', async () => {
            await cordovaSetVersion({ version: null, buildNumber: null });

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD));
        });

        it('({ version: null, buildNumber: 86 })', async () => {
            await cordovaSetVersion({ version: null, buildNumber: 86 });

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.BUILD_TO_VERSION_AND_BUILD));
        });

        it("({ version: '2.4.9', buildNumber: null })", async () => {
            await cordovaSetVersion({ version: '2.4.9', buildNumber: null });

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD));
        });

        it('({ configPath: null })', async () => {
            await cordovaSetVersion({ configPath: null });

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD));
        });

        it('({ configPath: null, buildNumber: null })', async () => {
            await cordovaSetVersion({ configPath: null, buildNumber: null });

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD));
        });

        it('({ configPath: null, buildNumber: 86 })', async () => {
            await cordovaSetVersion({ configPath: null, buildNumber: 86 });

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.BUILD_TO_VERSION_AND_BUILD));
        });

        it('({ configPath: null, version: null })', async () => {
            await cordovaSetVersion({ configPath: null, version: null });

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD));
        });

        it('({ configPath: null, version: null, buildNumber: null })', async () => {
            await cordovaSetVersion({ configPath: null, version: null, buildNumber: null });

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD));
        });

        it('({ configPath: null, version: null, buildNumber: 86 })', async () => {
            await cordovaSetVersion({ configPath: null, version: null, buildNumber: 86 });

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.BUILD_TO_VERSION_AND_BUILD));
        });

        it("({ configPath: null, version: '2.4.9' })", async () => {
            await cordovaSetVersion({ configPath: null, version: '2.4.9' });

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD));
        });

        it("({ configPath: null, version: '2.4.9', buildNumber: null })", async () => {
            await cordovaSetVersion({ configPath: null, version: '2.4.9', buildNumber: null });

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD));
        });

        it("({ configPath: null, version: '2.4.9', buildNumber: 86 })", async () => {
            await cordovaSetVersion({ configPath: null, version: '2.4.9', buildNumber: 86 });

            expect(readFile(tempConfigFile)).toBe(readFile(expectedXmlFiles.VERSION_AND_BUILD_TO_VERSION_AND_BUILD));
        });

        it('({ configPath: tempProvidedConfigFile, buildNumber: null })', async () => {
            await cordovaSetVersion({ configPath: tempProvidedConfigFile, buildNumber: null });

            expect(readFile(tempProvidedConfigFile)).toBe(
                readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD),
            );
        });

        it('({ configPath: tempProvidedConfigFile, version: null })', async () => {
            await cordovaSetVersion({ configPath: tempProvidedConfigFile, version: null });

            expect(readFile(tempProvidedConfigFile)).toBe(
                readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD),
            );
        });

        it('({ configPath: tempProvidedConfigFile, version: null, buildNumber: null })', async () => {
            await cordovaSetVersion({ configPath: tempProvidedConfigFile, version: null, buildNumber: null });

            expect(readFile(tempProvidedConfigFile)).toBe(
                readFile(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD),
            );
        });

        it('({ configPath: tempProvidedConfigFile, version: null, buildNumber: 86 })', async () => {
            await cordovaSetVersion({ configPath: tempProvidedConfigFile, version: null, buildNumber: 86 });

            expect(readFile(tempProvidedConfigFile)).toBe(readFile(expectedXmlFiles.BUILD_TO_VERSION_AND_BUILD));
        });

        it("({ configPath: tempProvidedConfigFile, version: '2.4.9', buildNumber: null })", async () => {
            await cordovaSetVersion({ configPath: tempProvidedConfigFile, version: '2.4.9', buildNumber: null });

            expect(readFile(tempProvidedConfigFile)).toBe(readFile(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD));
        });
    });
}

export default nullsTest;
