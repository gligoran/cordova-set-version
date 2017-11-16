import fs from 'fs';
import promisify from 'util-promisify';
import xml2js from 'xml2js-es6-promise';
import { Builder } from 'xml2js';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const xmlBuilder = new Builder();
const DefaultConfigPath = './config.xml';

/**
 * Set Version and/or Build Number of Cordova config.xml.
 * @param {string} [configPath]
 * @param {string} [version]
 * @param {number} [buildNumber]
 */
async function cordovaSetVersion(...args) {
    let [configPath, version, buildNumber] = parseArguments(...args);

    configPath = configPath || DefaultConfigPath;
    version = version || null;
    buildNumber = buildNumber || null;

    if (typeof configPath !== 'string') {
        throw TypeError('"configPath" argument must be a string');
    }

    if (version && typeof version !== 'string') {
        throw TypeError('"version" argument must be a string');
    }

    if (buildNumber && typeof buildNumber !== 'number') {
        throw TypeError('"buildNumber" argument must be an integer');
    }

    if (buildNumber && buildNumber !== parseInt(buildNumber, 10)) {
        throw TypeError('"buildNumber" argument must be an integer');
    }

    const configFile = await readFile(configPath, 'UTF-8');
    const xml = await xml2js(configFile);

    if (!version && !buildNumber) {
        const packageFile = await readFile('./package.json', 'UTF-8');
        const pkg = JSON.parse(packageFile);
        ({ version } = pkg);
    }

    if (version) {
        xml.widget.$.version = version;
    }

    if (buildNumber) {
        xml.widget.$['android-versionCode'] = buildNumber;
        xml.widget.$['ios-CFBundleVersion'] = buildNumber;
        xml.widget.$['osx-CFBundleVersion'] = buildNumber;
    }

    const newData = xmlBuilder.buildObject(xml);

    await writeFile(configPath, newData, { encoding: 'UTF-8' });
}

function parseArguments(...args) {
    if (args.length === 0) {
        return [null, null, null];
    }

    if (args.length === 1) {
        if (typeof args[0] === 'string' && args[0].indexOf('.xml') < 0) {
            return [null, args[0], null];
        } else if (typeof args[0] === 'number') {
            return [null, null, ...args];
        }

        return [...args, null, null];
    }

    if (args.length === 2) {
        if (typeof args[0] === 'string') {
            if (args[0].indexOf('.xml') >= 0) {
                if (typeof args[1] === 'number') {
                    return [args[0], null, args[1]];
                }

                return [...args, null];
            }

            return [null, ...args];
        } else if (typeof args[1] === 'number') {
            return [args[0], null, args[1]];
        }

        return [...args, null];
    }

    return args;
}

export default cordovaSetVersion;
