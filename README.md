# cordova-set-version

[![NPM](https://nodei.co/npm/cordova-set-version.png?downloads=true&stars=true)](https://nodei.co/npm/cordova-set-version/)

[![ISC License](https://img.shields.io/npm/l/cordova-set-version.svg?style=flat)](http://opensource.org/licenses/ISC)
[![npm version](https://img.shields.io/npm/v/cordova-set-version.svg?style=flat)](http://npm.im/cordova-set-version)
[![npm downloads](https://img.shields.io/npm/dt/cordova-set-version.svg?style=flat)](http://npm-stat.com/charts.html?package=cordova-set-version&from=2017-02-08)
[![build](https://img.shields.io/github/workflow/status/gligoran/cordova-set-version/node/master?style=flat)](https://github.com/gligoran/cordova-set-version/actions?query=branch%3Amaster+workflow%3Anode)
[![codecov](https://img.shields.io/codecov/c/github/gligoran/cordova-set-version.svg?style=flat)](https://codecov.io/gh/gligoran/cordova-set-version)
[![maintainability](https://img.shields.io/codeclimate/maintainability/gligoran/cordova-set-version?style=flat)](https://codeclimate.com/github/gligoran/cordova-set-version/maintainability)
[![dependencies](https://img.shields.io/david/gligoran/cordova-set-version.svg?style=flat)](https://david-dm.org/gligoran/cordova-set-version)
[![devDependencies](https://img.shields.io/david/dev/gligoran/cordova-set-version.svg?style=flat)](https://david-dm.org/gligoran/cordova-set-version?type=dev)
[![known vulnerabilities](https://snyk.io/test/github/gligoran/cordova-set-version/badge.svg?targetFile=package.json)](https://snyk.io/test/github/gligoran/cordova-set-version?targetFile=package.json)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat)](https://github.com/semantic-release/semantic-release)

## Features

- Writes `version` and `buildNumber` to Cordova `config.xml`
- Can read `version` from local `package.json`
- Has CLI

## Install

```sh
$ npm install cordova-set-version
```

## Usage

```js
const cordovaSetVersion = require('cordova-set-version');

cordovaSetVersion(); // reads version from package.json
cordovaSetVersion('2.4.9');
cordovaSetVersion('./config.alt.xml', '2.4.9');
cordovaSetVersion('./config.alt.xml', 86);
cordovaSetVersion('./config.alt.xml', '2.4.9', 86)
    .catch(error => { ... });
```

## API

`cordovaSetVersion([configPath], [version], [buildNumber]): Promise`

- `configPath` _(string)_ - path to your `config.xml`
- `version` _(string)_ - version to be written
- `buildNumber` _(number)_ - build number to be written

## CLI

`cordova-set-version [-v|--version <version>] [-b|--build-number <build-number>] [config.xml]`

Options:

- `-v`/`--version` - version to set
- `-b`/`--build-number` - build number to set
- `--help` - display help

Examples

```
$ cordova-set-version
$ cordova-set-version -v 2.4.9
$ cordova-set-version -b 86
$ cordova-set-version -v 2.4.9 -b 86
```
