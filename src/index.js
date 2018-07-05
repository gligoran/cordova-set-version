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

    checkTypeErrors(configPath, version, buildNumber);

    let xml = await getXml(configPath);

    if (!version && !buildNumber) {
        version = await getVersionFromPackage(version);
    }

    xml = setAttributes(xml, version, buildNumber);

    const newData = xmlBuilder.buildObject(xml);
    return writeFile(configPath, newData, { encoding: 'UTF-8' });
}

function parseArguments(...args) {
    switch (args.length) {
        case 0:
            return [null, null, null];
        case 1:
            return parse1Argument(args[0]);
        case 2:
            return parse2Arguments(args[0], args[1]);
        default:
            return args;
    }
}

function parse1Argument(arg) {
    if (typeof arg === 'string' && arg.indexOf('.xml') < 0) {
        return [null, arg, null];
    }

    if (typeof arg === 'number') {
        return [null, null, arg];
    }

    return [arg, null, null];
}

function parse2Arguments(arg1, arg2) {
    const arg1IsString = typeof arg1 === 'string';
    const arg1IsStringXml = arg1IsString && arg1.indexOf('.xml') >= 0;
    const arg2IsNumber = typeof arg2 === 'number';

    if (arg2IsNumber && (arg1IsStringXml || !arg1IsString)) {
        return [arg1, null, arg2];
    }

    if (arg1IsString && !arg1IsStringXml) {
        return [null, arg1, arg2];
    }

    return [arg1, arg2, null];
}

function checkTypeErrors(configPath, version, buildNumber) {
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
}

async function getXml(configPath) {
    const configFile = await readFile(configPath, 'UTF-8');

    return xml2js(configFile);
}

async function getVersionFromPackage() {
    const packageFile = await readFile('./package.json', 'UTF-8');
    const pkg = JSON.parse(packageFile);
    const { version } = pkg;

    return version;
}

function setAttributes(xml, version, buildNumber) {
    const newXml = xml;

    if (version) {
        newXml.widget.$.version = version;
    }

    if (buildNumber) {
        newXml.widget.$['android-versionCode'] = buildNumber;
        newXml.widget.$['ios-CFBundleVersion'] = buildNumber;
        newXml.widget.$['osx-CFBundleVersion'] = buildNumber;
    }

    return newXml;
}

export default cordovaSetVersion;
