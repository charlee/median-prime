import { get, getMedianPrime } from './api';

describe('get', () => {
    const fetchSpy = jest.fn(x => ({
        then: f => f({ status: 200, json: () => null }),
    }));

    beforeEach(() => {
        global.fetch = fetchSpy;
    });

    it('should call correct url with params', () => {
        get('/api/test', { a1: 1, a2: 2 });
        expect(fetchSpy).toHaveBeenCalledWith('/api/test?a1=1&a2=2');
    });

    it('should call correct url without params', () => {
        get('/api/test');
        expect(fetchSpy).toHaveBeenCalledWith('/api/test');
    });
});

describe('get (failure)', () => {
    const fetchSpy = jest.fn(x => ({
        then: f => f({ status: 400, json: () => ({
            then: f => f({ error: 'wrong param'}),
        })}),
    }));

    beforeEach(() => {
        global.fetch = fetchSpy;
    });

    it('should throw error', () => {
        expect(() => {
            get('/api/test', { a1: 1, a2: 2 });
        }).toThrow();
    });
});

describe('getMedianPrime', () => {
    const fetchSpy = jest.fn(x => ({
        then: f => f({ status: 200, json: () => null }),
    }));

    beforeEach(() => {
        global.fetch = fetchSpy;
    });

    it('should call correct url', () => {
        getMedianPrime(10);
        expect(fetchSpy).toHaveBeenCalledWith('/api/medianprime?n=10');
    });
})