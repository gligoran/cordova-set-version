'use strict';

var fs = require('fs');
var xml2js = require('xml2js');
var xmlParser = new xml2js.Parser();
var xmlBuilder = new xml2js.Builder();

module.exports = {
    setVersion: setVersion
};

function setVersion(configPath, version, callback) {
    fs.readFile(configPath, { encoding: 'UTF-8' }, function (readError, configData) {
        if (readError) {
            callback(readError);
        }

        xmlParser.parseString(configData, function (parseError, configXml) {
            if (parseError) {
                callback(parseError);
            }

            configXml.widget.$.version = version;
            var newConfigData = xmlBuilder.buildObject(configXml);
            fs.writeFile(configPath, newConfigData, { encoding: 'UTF-8' }, callback);
        });
    });
}
