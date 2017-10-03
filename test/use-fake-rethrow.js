import proxyquire from 'proxyquire';

function useFakeRethrow(done) {
    return proxyquire.noCallThru().load('../src/index', { './rethrow': fakeRethrow }).default;

    function fakeRethrow() {
        return error => { // eslint-disable-line no-unused-vars
            if (error) {
                done(error);
                throw error;
            } else {
                done();
            }
        };
    }
}

export default useFakeRethrow;
