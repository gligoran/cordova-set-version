#!/usr/bin/env node

import meow from 'meow';

import cordovaSetVersion from '.';

const help = `
    Usage
      $ cordova-set-version [-v|--version <version>] [-b|--build-number <build-number>] [config.xml]
    
    Options
      -v, --version Version to set
      -b, --build-number Build number to set
      
    Examples
      $ cordova-set-version -v 2.4.9
      $ cordova-set-version -b 86
      $ cordova-set-version -v 2.4.9 -b 86
`;

const options = {
    flags: {
        version: {
            type: 'string',
            alias: 'v',
        },
        buildNumber: {
            type: 'number',
            alias: 'b',
        },
    },
    help,
    autoVersion: false,
};

const cli = meow(options);

const configPath = cli.input[0] || null;
const version = cli.flags.version || null;
const buildNumber = +cli.flags.buildNumber || null;

cordovaSetVersion({ configPath, version, buildNumber });
