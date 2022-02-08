export const temporaryConfigFile = './config.xml';

export const temporaryProvidedConfigFile = './config.provided.xml';
export const temporaryProvidedPluginConfigFile = './plugin.provided.xml';

export const entryConfigFiles = {
  VERSION_AND_BUILD: './configs/entry/config.version-and-build.xml',
  VERSION_AND_NO_BUILD: './configs/entry/config.version-and-no-build.xml',
  NO_VERSION_AND_BUILD: './configs/entry/config.no-version-and-build.xml',
  NO_VERSION_AND_NO_BUILD: './configs/entry/config.no-version-and-no-build.xml',
  MALFORMED: './configs/entry/config.malformed.xml',
  MISSING: './configs/entry/config.missing.xml',
};

export const entryPluginConfigFiles = {
  VERSION: './configs/entry/plugin.version.xml',
  NO_VERSION: './configs/entry/plugin.no-version.xml',
  MALFORMED: './configs/entry/plugin.malformed.xml',
};

export const expectedXmlFiles = {
  VERSION_AND_BUILD_TO_VERSION_AND_BUILD:
    './configs/expected/config.version-and-build.to.version-and-build.xml',
  VERSION_AND_BUILD_TO_VERSION_AND_NO_BUILD:
    './configs/expected/config.version-and-build.to.version-and-no-build.xml',
  VERSION_AND_BUILD_TO_NO_VERSION_AND_BUILD:
    './configs/expected/config.version-and-build.to.no-version-and-build.xml',
  VERSION_AND_BUILD_TO_NO_VERSION_AND_NO_BUILD:
    './configs/expected/config.version-and-build.to.no-version-and-no-build.xml',

  VERSION_TO_VERSION_AND_BUILD:
    './configs/expected/config.version.to.version-and-build.xml',
  VERSION_TO_VERSION_AND_NO_BUILD:
    './configs/expected/config.version.to.version-and-no-build.xml',
  VERSION_TO_NO_VERSION_AND_BUILD:
    './configs/expected/config.version.to.no-version-and-build.xml',
  VERSION_TO_NO_VERSION_AND_NO_BUILD:
    './configs/expected/config.version.to.no-version-and-no-build.xml',

  BUILD_TO_VERSION_AND_BUILD:
    './configs/expected/config.build.to.version-and-build.xml',
  BUILD_TO_VERSION_AND_NO_BUILD:
    './configs/expected/config.build.to.version-and-no-build.xml',
  BUILD_TO_NO_VERSION_AND_BUILD:
    './configs/expected/config.build.to.no-version-and-build.xml',
  BUILD_TO_NO_VERSION_AND_NO_BUILD:
    './configs/expected/config.build.to.no-version-and-no-build.xml',

  PACKAGE_VERSION_TO_VERSION_AND_BUILD:
    './configs/expected/config.package-version.to.version-and-build.xml',
  PACKAGE_VERSION_TO_VERSION_AND_NO_BUILD:
    './configs/expected/config.package-version.to.version-and-no-build.xml',
  PACKAGE_VERSION_TO_NO_VERSION_AND_BUILD:
    './configs/expected/config.package-version.to.no-version-and-build.xml',
  PACKAGE_VERSION_TO_NO_VERSION_AND_NO_BUILD:
    './configs/expected/config.package-version.to.no-version-and-no-build.xml',
};

export const expectedPluginXmlFiles = {
  VERSION_TO_VERSION: './configs/expected/plugin.version.to.version.xml',
  VERSION_TO_NO_VERSION: './configs/expected/plugin.version.to.no-version.xml',

  PACKAGE_VERSION_TO_VERSION:
    './configs/expected/plugin.package-version.to.version.xml',
  PACKAGE_VERSION_TO_NO_VERSION:
    './configs/expected/plugin.package-version.to.no-version.xml',
};
