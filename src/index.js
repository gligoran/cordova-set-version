import fs from 'fs';
import { Parser, Builder } from 'xml2js';

import rethrow from './rethrow';

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
function cordovaSetVersion(...args) {
    let [configPath, version, buildNumber, callback] = parseArguments(...args);

    configPath = configPath || DefaultConfigPath;
    version = version || null;
    buildNumber = buildNumber || null;
    callback = callback || rethrow();

    if (typeof callback !== 'function') {
        throw new TypeError('"callback" argument must be a function');
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

    if (buildNumber && buildNumber !== parseInt(buildNumber, 10)) {
        callback(new TypeError('"buildNumber" argument must be an integer'));
        return;
    }

    fs.readFile(configPath, 'UTF-8', (error, data) => {
        if (error) {
            callback(error);
            return;
        }

        if (!version && !buildNumber) {
            fs.readFile('./package.json', 'UTF-8', (readFileError, readFileData) => {
                if (readFileError) {
                    callback(readFileError);
                    return;
                }

                try {
                    const pkg = JSON.parse(readFileData);
                    updateConfigXml(pkg.version);
                } catch (exception) {
                    callback(exception);
                }
            });
        } else {
            updateConfigXml(version);
        }

        function updateConfigXml(newVersion) {
            xmlParser.parseString(data, (xmlParserError, xml) => {
                const newXml = xml;
                if (xmlParserError) {
                    callback(xmlParserError);
                    return;
                }

                if (newVersion) {
                    newXml.widget.$.version = newVersion;
                }

                if (buildNumber) {
                    newXml.widget.$['android-versionCode'] = buildNumber;
                    newXml.widget.$['ios-CFBundleVersion'] = buildNumber;
                    newXml.widget.$['osx-CFBundleVersion'] = buildNumber;
                }

                const newData = xmlBuilder.buildObject(newXml);
                fs.writeFile(configPath, newData, {
                    encoding: 'UTF-8'
                }, callback);
            });
        }
    });
}

function parseArguments(...args) {
    if (args.length === 0) {
        return [null, null, null, null];
    }

    if (args.length === 1) {
        if (typeof args[0] === 'string') {
            if (args[0].indexOf('.xml') >= 0) {
                return [args[0], null, null, null];
            }
            return [null, args[0], null, null];
        } else if (typeof args[0] === 'number') {
            return [null, null, args[0], null];
        } else if (typeof args[0] === 'function') {
            return [null, null, null, args[0]];
        }

        return [args[0], null, null, null];
    }

    if (args.length === 2) {
        if (typeof args[0] === 'string') {
            if (args[0].indexOf('.xml') >= 0) {
                if (typeof args[1] === 'number') {
                    return [args[0], null, args[1], null];
                } else if (typeof args[1] === 'function') {
                    return [args[0], null, null, args[1]];
                }
                return [args[0], args[1], null, null];
            }
            if (typeof args[1] === 'function') {
                return [null, args[0], null, args[1]];
            }

            return [null, args[0], args[1], null];
        } else if (typeof args[0] === 'number') {
            return [null, null, args[0], args[1]];
        } else if (typeof args[1] === 'number') {
            return [args[0], null, args[1], null];
        } else if (typeof args[1] === 'function') {
            return [args[0], null, null, args[1]];
        }

        return [args[0], args[1], null, null];
    }

    if (args.length === 3) {
        if (typeof args[0] === 'string') {
            if (args[0].indexOf('.xml') >= 0) {
                if (typeof args[1] === 'number') {
                    return [args[0], null, args[1], args[2]];
                } else if (typeof args[2] === 'function') {
                    return [args[0], args[1], null, args[2]];
                }

                return [args[0], args[1], args[2], null];
            }

            return [null, args[0], args[1], args[2]];
        } else if (typeof args[1] === 'number') {
            return [args[0], null, args[1], args[2]];
        } else if (typeof args[2] === 'function') {
            return [args[0], args[1], null, args[2]];
        }

        return args;
    }

    return args;
}

export default cordovaSetVersion;
