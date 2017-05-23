'use strict'

import { describe, it } from 'mocha'
import chai, { expect } from 'chai'
import dirtyChai from 'dirty-chai'
import chaiFiles, { file } from 'chai-files'
import fs from 'fs-extra'

import cordovaSetVersion from '../src/index'
import { tempConfigFile, entryConfigFiles, expectedXmlFiles } from './configs'
import { tempPackageFile, entryPackageFiles } from './packages'

chai.use(chaiFiles)
chai.use(dirtyChai)

function callbackTest () {
  describe('(callback)', () => {
    it('should override existing version and preserve existing buildNumber', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)
      fs.copySync(entryPackageFiles.GOOD, tempPackageFile)

      cordovaSetVersion((error) => {
        expect(error).to.not.exist()
        expect(file(tempConfigFile)).to.equal(file(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD))

        done()
      })
    })

    it('should override existing version and not add buildNumber', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_NO_BUILD, tempConfigFile)
      fs.copySync(entryPackageFiles.GOOD, tempPackageFile)

      cordovaSetVersion((error) => {
        expect(error).to.not.exist()
        expect(file(tempConfigFile)).to.equal(file(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_NO_BUILD))

        done()
      })
    })

    it('should add version and preserve existing buildNumber', (done) => {
      fs.copySync(entryConfigFiles.NO_VERSION_AND_BUILD, tempConfigFile)
      fs.copySync(entryPackageFiles.GOOD, tempPackageFile)

      cordovaSetVersion((error) => {
        expect(error).to.not.exist()
        expect(file(tempConfigFile)).to.equal(file(expectedXmlFiles.PACKAGE_VERSION_TO_NO_VERSION_AND_BUILD))

        done()
      })
    })

    it('should add version and not add buildNumber', (done) => {
      fs.copySync(entryConfigFiles.NO_VERSION_AND_NO_BUILD, tempConfigFile)
      fs.copySync(entryPackageFiles.GOOD, tempPackageFile)

      cordovaSetVersion((error) => {
        expect(error).to.not.exist()
        expect(file(tempConfigFile)).to.equal(file(expectedXmlFiles.PACKAGE_VERSION_TO_NO_VERSION_AND_NO_BUILD))

        done()
      })
    })

    it('should return an error about missing config file', (done) => {
      cordovaSetVersion(tempConfigFile, (error) => {
        expect(error).to.exist()
        expect(error.message).to.contain('no such file or directory')
        expect(error.message).to.contain('config.xml')

        done()
      })
    })

    it('should return an error about malformed config file', (done) => {
      fs.copySync(entryConfigFiles.MALFORMED, tempConfigFile)
      fs.copySync(entryPackageFiles.GOOD, tempPackageFile)

      cordovaSetVersion((error) => {
        expect(error).to.exist()
        expect(error.message).to.not.contain('no such file or directory')

        done()
      })
    })

    it('should return an error about missing package file', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)

      cordovaSetVersion((error) => {
        expect(error).to.exist()
        expect(error.message).to.contain('no such file or directory')
        expect(error.message).to.contain('package.json')

        done()
      })
    })

    it('should return an error about malformed package file', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)
      fs.copySync(entryPackageFiles.MALFORMED, tempPackageFile)

      cordovaSetVersion((error) => {
        expect(error).to.exist()
        expect(error.message).to.not.contain('no such file or directory')

        done()
      })
    })
  })
}

export default callbackTest
