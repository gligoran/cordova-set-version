'use strict'

import { describe, it } from 'mocha'
import { expect } from 'chai'
import fs from 'fs-extra'

import useFakeRethrow from './use-fake-rethrow'
import { tempConfigFile, entryConfigFiles } from './configs'

function versionBuildNumberTest () {
  describe('(version, buildNumber)', () => {
    it('should not throw an error', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, '2.4.9', 86))
                .to.not.throw()
    })
  })
}

export default versionBuildNumberTest
