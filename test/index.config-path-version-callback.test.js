'use strict'

import { describe, it } from 'mocha'
import chai, { expect } from 'chai'
import dirtyChai from 'dirty-chai'
import chaiFiles, { file } from 'chai-files'
import fs from 'fs-extra'

import cordovaSetVersion from '../src/index'
import { tempProvidedConfigFile, entryConfigFiles, expectedXmlFiles } from './configs'

chai.use(chaiFiles)
chai.use(dirtyChai)

function configPathVersionCallbackTest () {
  describe('(configPath, version, callback)', () => {
    it('should override existing version and preserve existing buildNumber', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile)

      cordovaSetVersion(tempProvidedConfigFile, '2.4.9', (error) => {
        expect(error).to.not.exist()
        expect(file(tempProvidedConfigFile)).to.equal(file(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD))

        done()
      })
    })

    it('should override existing version and not add buildNumber', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_NO_BUILD, tempProvidedConfigFile)

      cordovaSetVersion(tempProvidedConfigFile, '2.4.9', (error) => {
        expect(error).to.not.exist()
        expect(file(tempProvidedConfigFile)).to.equal(file(expectedXmlFiles.VERSION_TO_VERSION_AND_NO_BUILD))

        done()
      })
    })

    it('should add version and preserve existing buildNumber', (done) => {
      fs.copySync(entryConfigFiles.NO_VERSION_AND_BUILD, tempProvidedConfigFile)

      cordovaSetVersion(tempProvidedConfigFile, '2.4.9', (error) => {
        expect(error).to.not.exist()
        expect(file(tempProvidedConfigFile)).to.equal(file(expectedXmlFiles.VERSION_TO_NO_VERSION_AND_BUILD))

        done()
      })
    })

    it('should add version and not add buildNumber', (done) => {
      fs.copySync(entryConfigFiles.NO_VERSION_AND_NO_BUILD, tempProvidedConfigFile)

      cordovaSetVersion(tempProvidedConfigFile, '2.4.9', (error) => {
        expect(error).to.not.exist()
        expect(file(tempProvidedConfigFile)).to.equal(file(expectedXmlFiles.VERSION_TO_NO_VERSION_AND_NO_BUILD))

        done()
      })
    })

    it('should return an error about configPath type', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile)

      cordovaSetVersion({}, '2.4.9', (error) => {
        expect(error).to.exist()
        expect(error.message).to.contain('configPath')
        expect(error.message).to.not.contain('version')
        expect(error.message).to.contain('must be a')

        done()
      })
    })

    it('should return an error about version type', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile)

      cordovaSetVersion(tempProvidedConfigFile, {}, (error) => {
        expect(error).to.exist()
        expect(error.message).to.contain('version')
        expect(error.message).to.contain('must be a')

        done()
      })
    })

    it('should return an error about missing config file', (done) => {
      cordovaSetVersion(tempProvidedConfigFile, '2.4.9', (error) => {
        expect(error).to.exist()
        expect(error.message).to.contain('no such file or directory')
        expect(error.message).to.contain('config.provided.xml')

        done()
      })
    })

    it('should return an error about malformed config file', (done) => {
      fs.copySync(entryConfigFiles.MALFORMED, tempProvidedConfigFile)

      cordovaSetVersion(tempProvidedConfigFile, '2.4.9', (error) => {
        expect(error).to.exist()
        expect(error.message).to.not.contain('no such file or directory')

        done()
      })
    })
  })
}

export default configPathVersionCallbackTest
