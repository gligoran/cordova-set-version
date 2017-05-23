'use strict'

import { describe, it } from 'mocha'
import chai, { expect } from 'chai'
import chaiFiles, { file } from 'chai-files'
import fs from 'fs-extra'

import cordovaSetVersion from '../src/index'
import useFakeRethrow from './use-fake-rethrow'
import { tempConfigFile, tempProvidedConfigFile, entryConfigFiles, expectedXmlFiles } from './configs'
import { tempPackageFile, entryPackageFiles } from './packages'

chai.use(chaiFiles)

function nullsTest () {
  describe('nulls', () => {
    it('(configPath, version, buildNumber, null)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, tempProvidedConfigFile, '2.4.9', 86, null))
                .to.not.throw()
    })

    it('(configPath, version, null, callback)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile)

      cordovaSetVersion(tempProvidedConfigFile, '2.4.9', null, (error) => {
        expect(error).to.not.exist()
        expect(file(tempProvidedConfigFile)).to.equal(file(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD))

        done()
      })
    })

    it('(configPath, version, null, null)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, tempProvidedConfigFile, '2.4.9', null, null))
                .to.not.throw()
    })

    it('(configPath, version, null)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, tempProvidedConfigFile, '2.4.9', null))
                .to.not.throw()
    })

    it('(configPath, null, buildNumber, callback)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile)

      cordovaSetVersion(tempProvidedConfigFile, null, 86, (error) => {
        expect(error).to.not.exist()
        expect(file(tempProvidedConfigFile)).to.equal(file(expectedXmlFiles.BUILD_TO_VERSION_AND_BUILD))

        done()
      })
    })

    it('(configPath, null, buildNumber, null)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, tempProvidedConfigFile, null, 86, null))
                .to.not.throw()
    })

    it('(configPath, null, buildNumber)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, tempProvidedConfigFile, null, 86))
                .to.not.throw()
    })

    it('(configPath, null, null, callback)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile)
      fs.copySync(entryPackageFiles.GOOD, tempPackageFile)

      cordovaSetVersion(tempProvidedConfigFile, null, null, (error) => {
        expect(error).to.not.exist()
        expect(file(tempProvidedConfigFile)).to.equal(file(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD))

        done()
      })
    })

    it('(configPath, null, null, null)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile)
      fs.copySync(entryPackageFiles.GOOD, tempPackageFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, tempProvidedConfigFile, null, null, null))
                .to.not.throw()
    })

    it('(configPath, null, null)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile)
      fs.copySync(entryPackageFiles.GOOD, tempPackageFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, tempProvidedConfigFile, null, null))
                .to.not.throw()
    })

    it('(configPath, null, callback)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile)
      fs.copySync(entryPackageFiles.GOOD, tempPackageFile)

      cordovaSetVersion(tempProvidedConfigFile, null, (error) => {
        expect(error).to.not.exist()
        expect(file(tempProvidedConfigFile)).to.equal(file(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD))

        done()
      })
    })

    it('(configPath, null)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, tempProvidedConfigFile, null))
                .to.not.throw()
    })

    it('(configPath, buildNumber, null)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempProvidedConfigFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, tempProvidedConfigFile, 86, null))
                .to.not.throw()
    })

    it('(null, version, buildNumber, callback)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)

      cordovaSetVersion(null, '2.4.9', 86, (error) => {
        expect(error).to.not.exist()
        expect(file(tempConfigFile)).to.equal(file(expectedXmlFiles.VERSION_AND_BUILD_TO_VERSION_AND_BUILD))

        done()
      })
    })

    it('(null, version, buildNumber, null)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, null, '2.4.9', 86, null))
                .to.not.throw()
    })

    it('(null, version, buildNumber)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, null, '2.4.9', 86))
                .to.not.throw()
    })

    it('(null, version, null, callback)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)

      cordovaSetVersion(null, '2.4.9', null, (error) => {
        expect(error).to.not.exist()
        expect(file(tempConfigFile)).to.equal(file(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD))

        done()
      })
    })

    it('(null, version, null, null)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, null, '2.4.9', null, null))
                .to.not.throw()
    })

    it('(null, version, null)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, null, '2.4.9', null))
                .to.not.throw()
    })

    it('(null, version, callback)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)

      cordovaSetVersion(null, '2.4.9', (error) => {
        expect(error).to.not.exist()
        expect(file(tempConfigFile)).to.equal(file(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD))

        done()
      })
    })

    it('(null, version)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, null, '2.4.9'))
                .to.not.throw()
    })

    it('(null, null, buildNumber, callback)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)

      cordovaSetVersion(null, null, 86, (error) => {
        expect(error).to.not.exist()
        expect(file(tempConfigFile)).to.equal(file(expectedXmlFiles.BUILD_TO_VERSION_AND_BUILD))

        done()
      })
    })

    it('(null, null, buildNumber, null)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, null, null, 86, null))
                .to.not.throw()
    })

    it('(null, null, buildNumber)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, null, null, 86))
                .to.not.throw()
    })

    it('(null, null, null, callback)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)
      fs.copySync(entryPackageFiles.GOOD, tempPackageFile)

      cordovaSetVersion(null, null, null, (error) => {
        expect(error).to.not.exist()
        expect(file(tempConfigFile)).to.equal(file(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD))

        done()
      })
    })

    it('(null, null, null, null)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)
      fs.copySync(entryPackageFiles.GOOD, tempPackageFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, null, null, null, null))
                .to.not.throw()
    })

    it('(null, null, null)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)
      fs.copySync(entryPackageFiles.GOOD, tempPackageFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, null, null, null))
                .to.not.throw()
    })

    it('(null, null, callback)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)
      fs.copySync(entryPackageFiles.GOOD, tempPackageFile)

      cordovaSetVersion(null, null, (error) => {
        expect(error).to.not.exist()
        expect(file(tempConfigFile)).to.equal(file(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD))

        done()
      })
    })

    it('(null, null)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)
      fs.copySync(entryPackageFiles.GOOD, tempPackageFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, null, null))
                .to.not.throw()
    })

    it('(null, buildNumber, callback)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)

      cordovaSetVersion(null, 86, (error) => {
        expect(error).to.not.exist()
        expect(file(tempConfigFile)).to.equal(file(expectedXmlFiles.BUILD_TO_VERSION_AND_BUILD))

        done()
      })
    })

    it('(null, buildNumber, null)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, null, 86, null))
                .to.not.throw()
    })

    it('(null, buildNumber)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, null, 86))
                .to.not.throw()
    })

    it('(null, callback)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)
      fs.copySync(entryPackageFiles.GOOD, tempPackageFile)

      cordovaSetVersion(null, (error) => {
        expect(error).to.not.exist()
        expect(file(tempConfigFile)).to.equal(file(expectedXmlFiles.PACKAGE_VERSION_TO_VERSION_AND_BUILD))

        done()
      })
    })

    it('(null)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)
      fs.copySync(entryPackageFiles.GOOD, tempPackageFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, null))
                .to.not.throw()
    })

    it('(version, buildNumber, null)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, '2.4.9', 86, null))
                .to.not.throw()
    })

    it('(version, null, callback)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)

      cordovaSetVersion('2.4.9', null, (error) => {
        expect(error).to.not.exist()
        expect(file(tempConfigFile)).to.equal(file(expectedXmlFiles.VERSION_TO_VERSION_AND_BUILD))

        done()
      })
    })

    it('(version, null, null)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, '2.4.9', null, null))
                .to.not.throw()
    })

    it('(version, null)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, '2.4.9', null))
                .to.not.throw()
    })

    it('(buildNumber, null)', (done) => {
      fs.copySync(entryConfigFiles.VERSION_AND_BUILD, tempConfigFile)

      let cordovaSetVersion = useFakeRethrow(done)

      expect(cordovaSetVersion.bind(null, 86, null))
                .to.not.throw()
    })
  })
}

export default nullsTest
