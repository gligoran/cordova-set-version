'use strict';

import fs from 'mz/fs';
import xml2js from 'xml2js-es6-promise';
import { Builder } from 'xml2js';

const xmlBuilder = new Builder();

function setBuildNumber(configPath, buildNumber) {
    return fs.readFile(configPath, { encoding: 'UTF-8' })
        .then((xmlString) => xml2js(xmlString))
        .then((xml) => writeBuildNumber(configPath, buildNumber, xml));
}

function writeBuildNumber(configPath, buildNumber, xml) {
    xml.widget.$['android-versionCode'] = buildNumber;
    xml.widget.$['ios-CFBundleVersion'] = buildNumber;
    xml.widget.$['osx-CFBundleVersion'] = buildNumber;
    let newConfigData = xmlBuilder.buildObject(xml);
    return fs.writeFile(configPath, newConfigData, { encoding: 'UTF-8' });
}

export default setBuildNumber;
