'use strict';

import proxyquire from 'proxyquire';

function useFakeRethrow(done) {
    return proxyquire.noCallThru().load('../src/index', { './rethrow': fakeRethrow }).default;

    function fakeRethrow() {
        return (error) => {
            done();
        }
    }
}

export default useFakeRethrow;
