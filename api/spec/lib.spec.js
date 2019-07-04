const { PrimeSieve, BitOddDict, primes, median, odd } = require('../lib');

describe('odd', () => {
    it('should test odd / even', () => {
        expect(odd(1)).toBeTruthy();
        expect(odd(2)).toBeFalsy();
    });
});

describe('BitOddDict', () => {

    it('should initialize with correct size', () => {
        expect(new BitOddDict(3, 7).size).toEqual(3);
        expect(new BitOddDict(5, 12).size).toEqual(4);
    });

    it('should be all true after init', () => {
        expect(new BitOddDict(3, 7).isTrue(3)).toBeTruthy();
        expect(new BitOddDict(3, 7).isTrue(5)).toBeTruthy();
        expect(new BitOddDict(3, 7).isTrue(7)).toBeTruthy();
    });

    it('should be all false for even numbers', () => {
        expect(new BitOddDict(3, 7).isTrue(4)).toBeFalsy();
    });

    it('should correctly mark give number as false', () => {
        const dict = new BitOddDict(3, 99);
        dict.setFalse(51);
        expect(dict.isTrue(3)).toBeTruthy();
        expect(dict.isTrue(51)).toBeFalsy();
        expect(dict.isTrue(99)).toBeTruthy();
    });
});

describe('PrimeSieve', () => {

    it('should initialize with given range and skip even numbers', () => {
        let sieve = new PrimeSieve(1, 10);
        expect(sieve.sieve.isTrue(3)).toBeTruthy();
        expect(sieve.sieve.isTrue(5)).toBeTruthy();
        expect(sieve.sieve.isTrue(7)).toBeTruthy();
        expect(sieve.sieve.isTrue(9)).toBeTruthy();

        sieve = new PrimeSieve(2, 11);
        expect(sieve.sieve.isTrue(3)).toBeTruthy();
        expect(sieve.sieve.isTrue(5)).toBeTruthy();
        expect(sieve.sieve.isTrue(7)).toBeTruthy();
        expect(sieve.sieve.isTrue(9)).toBeTruthy();
        expect(sieve.sieve.isTrue(11)).toBeTruthy();
    });

    it('should cross out multiples', () => {
        let sieve = new PrimeSieve(1, 10);
        sieve.crossOut(3);
        expect(sieve.sieve.isTrue(3)).toBeFalsy();
        expect(sieve.sieve.isTrue(5)).toBeTruthy();
        expect(sieve.sieve.isTrue(7)).toBeTruthy();
        expect(sieve.sieve.isTrue(9)).toBeFalsy();
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
        expect(primes(1000).length).toEqual(168);
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
