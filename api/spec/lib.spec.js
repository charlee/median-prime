const { PrimeSieve, PrimeCache, primes, median, odd } = require('../lib');

describe('odd', () => {
    it('should test odd / even', () => {
        expect(odd(1)).toBeTruthy();
        expect(odd(2)).toBeFalsy();
    });
});

describe('PrimeSieve', () => {

    it('should initialize with given range and skip even numbers', () => {
        expect(new PrimeSieve(1, 10).sieve).toEqual({3: true, 5: true, 7: true, 9: true});
        expect(new PrimeSieve(2, 11).sieve).toEqual({3: true, 5: true, 7: true, 9: true, 11: true});
    });

    it('should cross out multiples', () => {
        let sieve = new PrimeSieve(1, 10);
        sieve.crossOut(3);
        expect(sieve.sieve).toEqual({3: false, 5: true, 7: true, 9: false});
    })

    it('should test prime', () => {
        let sieve = new PrimeSieve(1, 10);
        sieve.crossOut(3);
        expect(sieve.isPrime(5)).toBeTruthy();
    })
});

describe('primes', () => {
    it('should return prime numbers', () => {
        expect(primes(20)).toEqual([2, 3, 5, 7, 11, 13, 17, 19]);
        expect(primes(100).length).toEqual(25);
        expect(primes(10000).length).toEqual(1229);
    });
});

describe('median', () => {
    it('should return one element for odd count', () => {
        expect(median([1, 2, 3, 4, 5])).toEqual([3]);
    });

    it('should return two elements for odd count', () => {
        expect(median([1, 2, 3, 4, 5, 6])).toEqual([3, 4]);
    });
});
