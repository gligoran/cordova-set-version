'use strict';

import fs from 'fs';
import { Parser, Builder} from 'xml2js';
import readPkg from 'read-pkg';

/**
 * writes version string to config.xml
 * @param configPath
 * @param version
 * @param callback
 */
function setVersion(configPath, version, callback) {
    getVersion(version, callback)
        .then(function (version) {
            fs.readFile(configPath, {encoding: 'UTF-8'}, handleSetVersionReadFile.bind(this, configPath, version, callback));
        })
        .catch(function (error) {
            callback(error);
        });
}

function getVersion(version) {
    if (version) {
        return Promise.resolve(version);
    }

    return readPkg()
        .then(function (packageJson) {
            if (packageJson && !packageJson.version) {
                throw new Error('package.json has no version field');
            }

            return packageJson.version;
        });
}

/**
 * @param configPath
 * @param version
 * @param callback
 * @param readError
 * @param configData
 */
function handleSetVersionReadFile(configPath, version, callback, readError, configData) {
    if (readError) {
        callback(readError);
        return;
    }

    let xmlParser = new Parser();
    xmlParser.parseString(configData, handleSetVersionParseXml.bind(this, configPath, version, callback));
}

/**
 * @param configPath
 * @param version
 * @param callback
 * @param parseError
 * @param {{widget:{$:{version:string}}}} configXml
 */
function handleSetVersionParseXml(configPath, version, callback, parseError, configXml) {
    if (parseError) {
        callback(parseError);
        return;
    }

    configXml.widget.$.version = version;

    let xmlBuilder = new Builder();
    let newConfigData = xmlBuilder.buildObject(configXml);
    fs.writeFile(configPath, newConfigData, {encoding: 'UTF-8'}, callback);
}

export default {
    setVersion
};