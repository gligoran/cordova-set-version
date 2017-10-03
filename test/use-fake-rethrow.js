import proxyquire from 'proxyquire';

function useFakeRethrow(done) {
    return proxyquire.noCallThru().load('../src/index', { './rethrow': fakeRethrow }).default;

    function fakeRethrow() {
        return error => { // eslint-disable-line no-unused-vars
            done();
        };
    }
}

export default useFakeRethrow;
