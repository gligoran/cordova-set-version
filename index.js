import fs from 'node:fs';
import promisify from 'util-promisify';
import xml2js from 'xml2js-es6-promise';
import { Builder } from 'xml2js';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const xmlBuilder = new Builder();

function checkTypeErrors(configPath, version, buildNumber) {
  if (typeof configPath !== 'string') {
    throw new TypeError('"configPath" argument must be a string');
  }

  if (version && typeof version !== 'string') {
    throw new TypeError('"version" argument must be a string');
  }

  if (buildNumber && typeof buildNumber !== 'number') {
    throw new TypeError('"buildNumber" argument must be an integer');
  }

  if (buildNumber && buildNumber !== Number.parseInt(buildNumber, 10)) {
    throw new TypeError('"buildNumber" argument must be an integer');
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
  const element = newXml.plugin ? 'plugin' : 'widget';

  if (version) {
    newXml[element].$.version = version;
  }

  if (element === 'widget' && buildNumber) {
    newXml.widget.$['android-versionCode'] = buildNumber;
    newXml.widget.$['ios-CFBundleVersion'] = buildNumber;
    newXml.widget.$['osx-CFBundleVersion'] = buildNumber;
  }

  return newXml;
}

/**
 * set Version and/or Build Number of Cordova config.xml.
 * @param {string} [configPath]
 * @param {string} [version]
 * @param {number} [buildNumber]
 */
async function cordovaSetVersion({ configPath, version, buildNumber } = {}) {
  const cPath = configPath || './config.xml';

  checkTypeErrors(cPath, version, buildNumber);

  const currentConfig = await getXml(cPath);

  const v =
    !version && !buildNumber ? await getVersionFromPackage(version) : version;

  const newConfig = setAttributes(currentConfig, v, buildNumber);

  const newData = xmlBuilder.buildObject(newConfig);
  return writeFile(cPath, newData, { encoding: 'UTF-8' });
}

export default cordovaSetVersion;
