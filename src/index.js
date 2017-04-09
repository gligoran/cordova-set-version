'use strict';

import fs from 'fs';
import { Parser, Builder} from 'xml2js';

/**
 * writes version string to config.xml
 * @param configPath
 * @param version
 * @param callback
 */
function setVersion(configPath, version, callback) {
    fs.readFile(configPath, {encoding: 'UTF-8'}, handleSetVersionReadFile.bind(this, configPath, version, callback));
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
function handleSetVersionParseXml(configPath, version, callback,parseError, configXml) {
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