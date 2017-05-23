'use strict'

import proxyquire from 'proxyquire'

function useFakeRethrow (done) {
  return proxyquire.noCallThru().load('../src/index', { './rethrow': fakeRethrow }).default

  function fakeRethrow () {
    return (error) => { // eslint-disable-line handle-callback-err
      done()
    }
  }
}

export default useFakeRethrow
