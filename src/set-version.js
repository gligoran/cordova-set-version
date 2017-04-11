'use strict';

import fs from 'mz/fs';
import xml2js from 'xml2js-es6-promise';
import { Builder } from 'xml2js';
import readPkg from 'read-pkg';

const xmlBuilder = new Builder();

/**
 * writes version string to config.xml
 * @param configPath
 * @param version
 */
function setVersion(configPath, version) {
    return getVersion(version)
        .then((v) => storeVersion(configPath, v));
}

function getVersion(version) {
    if (version) {
        return Promise.resolve(version);
    }

    return readPkg()
        .then((packageJson) => {
            if (!packageJson.version) {
                throw new Error('package.json has no version field');
            }

            return packageJson.version;
        });
}

function storeVersion(configPath, version) {
    return fs.readFile(configPath, { encoding: 'UTF-8' })
        .then((xmlString) => xml2js(xmlString))
        .then((xml) => writeVersion(configPath, version, xml));
}

function writeVersion(configPath, version, xml) {
    xml.widget.$.version = version;
    let newConfigData = xmlBuilder.buildObject(xml);
    return fs.writeFile(configPath, newConfigData, { encoding: 'UTF-8' });
}

export default setVersion;
