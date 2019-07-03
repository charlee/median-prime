const { primes } = require('../lib');

describe('primes', () => {
    it('should return prime numbers', () => {
        expect(primes(100).length).toBe(25);
        expect(primes(10000).length).toBe(1229);
    });
})