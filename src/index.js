'use strict';

import fs from 'fs';
import { Parser, Builder } from 'xml2js';

const xmlParser = new Parser();
const xmlBuilder = new Builder();
const DefaultConfigPath = './config.xml';

/**
 * Set Version and/or Build Number of Cordova config.xml.
 * @param {string} [configPath]
 * @param {string} [version]
 * @param {number} [buildNumber]
 * @param {function} callback 
 */
export default (configPath, version, buildNumber, callback) => {
    if (typeof configPath === 'function') {                 // (callback)
        callback = configPath;
        configPath = DefaultConfigPath;
        version = null;
        buildNumber = null;
    } else if (typeof version === 'function') {
        callback = version;

        if (typeof configPath === 'number') {               // (buildNumber, callback)
            buildNumber = configPath;
            configPath = DefaultConfigPath;
            version = null;
        } else if (typeof configPath === 'string') {
            if (configPath.indexOf('.xml') >= 0) {          // (configPath, callback)
                version = null;
            } else {                                        // (version, callback)
                version = configPath;
                configPath = DefaultConfigPath;
            }

            buildNumber = null;
        } else {                                            // (?, callback)
            version = null;
            buildNumber = null;
        }
    } else if (typeof buildNumber === 'function') {
        callback = buildNumber;

        if (typeof configPath === 'string') {
            if (configPath.indexOf('.xml') >= 0) {
                if (typeof version === 'number') {          // (configPath, buildNumber, callback)
                    buildNumber = version;
                    version = null;
                } else {                                    // (configPath, version, callback)
                    buildNumber = null;
                }
            } else {                                        // (verion, buildNumber, callback)
                buildNumber = version;
                version = configPath;
                configPath = DefaultConfigPath;
            }
        } else if (typeof version === 'number') {
            buildNumber = version;
            version = null;
        } else {                                            // (?, version, callback)
            buildNumber = null;
        }
    }                                                       // (configPath, version, buildNumber, callback)

    configPath = configPath || DefaultConfigPath;
    version = version || null;
    buildNumber = buildNumber || null;
    callback = callback || null;

    if (typeof callback !== 'function') {
        throw new TypeError('"callback" argument must be a callback');
    }

    if (typeof configPath !== 'string') {
        callback(new TypeError('"configPath" argument must be a string'));
        return;
    }

    if (version && typeof version !== 'string') {
        callback(new TypeError('"version" argument must be a string'));
        return;
    }

    if (buildNumber && typeof buildNumber !== 'number') {
        callback(new TypeError('"buildNumber" argument must be an integer'));
        return;
    }

    fs.readFile(configPath, 'UTF-8', (error, data) => {
        if (error) {
            callback(error);
            return;
        }

        if (!version && !buildNumber) {
            fs.readFile('./package.json', 'UTF-8', (error, data) => {
                if (error) {
                    callback(error);
                    return;
                }

                try {
                    let pkg = JSON.parse(data);
                    updateConfigXml(pkg.version);
                } catch (exception) {
                    callback(exception);
                }
            })
        } else {
            updateConfigXml(version);
        }

        function updateConfigXml(version) {
            xmlParser.parseString(data, (error, xml) => {
                if (error) {
                    callback(error);
                    return;
                }

                if (version) {
                    xml.widget.$.version = version;
                }

                if (buildNumber) {
                    xml.widget.$['android-versionCode'] = buildNumber;
                    xml.widget.$['ios-CFBundleVersion'] = buildNumber;
                    xml.widget.$['osx-CFBundleVersion'] = buildNumber;
                }

                let newData = xmlBuilder.buildObject(xml);
                fs.writeFile(configPath, newData, { encoding: 'UTF-8' }, callback);
            });
        }
    });
}
