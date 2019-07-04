/**
 * A library for retrieving prime numbers.
 * This library will cache calculated results.
 */

const odd = (n) => !!(n % 2);

/**
 * A bit version of dictionary that uses bit operations
 * to construct a true/false dict for odd numbers.
 * 
 * The purpose of this class is to minimize the space complexity.
 * By using native JS object, each number would require at least
 * (assuming we support up to 1e9)
 *   avg 4 bytes for the key + 1 bytes for the true/false = 5 bytes.
 * However by using bit operations, each number requires only 1 bit,
 * reducing the space requirement to 1/40 of native solution.
 */
class BitOddDict {

    /**
     * The caller MUST ensure min is an odd number
     * @param {number} min lower bound
     * @param {number} max upper bound
     */
    constructor(min, max) {
        this.min = min;
        this.max = max;
        this.size = Math.floor((max - min) / 2) + 1;
        this.bits = new Uint8Array(this.size);
        for (let i = 0; i < this.size; i++) {
            this.bits[i] = 0xff;
        }
    }

    isTrue(n) {
        // We don't support even numbers
        if (!odd(n)) {
            return false;
        }

        // Since this.min is odd, we are sure this returns an integer
        n = (n - this.min) / 2;

        const index = Math.floor(n / 8);
        const offset = n % 8;

        return !!(this.bits[index] & (1 << offset));
    }

    setFalse(n) {
        // We don't support even numbers
        if (!odd(n)) {
            return false;
        }

        // Since this.min is odd, we are sure this returns an integer
        n = (n - this.min) / 2;

        const index = Math.floor(n / 8);
        const offset = n % 8;

        this.bits[index] &= ~(1 << offset);
    }
}

class PrimeSieve {

    /**
     * Create a sieve.
     * Time complexity: O(m)
     *   - m: # of elems in sieve
     * @param {number} min 
     * @param {number} max 
     */
    constructor(min, max) {
        this.sieve = {};

        if (min === 1) {
            min = 3;
        }

        if (!odd(min)) {
            min++;
        }

        this.min = min;
        this.max = max;

        this.sieve = new BitOddDict(min, max);
    }

    /**
     * Cross out all the multiples from dict.
     * Time complexity: O(n/m)
     *   - n = # of elems in sieve
     *   - m = num
     * @param {number} num
     */
    crossOut(num) {

        // k is the factor for multiples of num
        let k = Math.ceil(this.min / num);

        if (!odd(k)) {
            // we don't want to try even multiples
            // because they are not in this.sieve
            k++;
        }

        // cross out multiples of num
        while (k * num <= this.max) {
            this.sieve.setFalse(k * num);
            k += 2;
        }
    }

    /**
     * Check if n is a prime number.
     * Time complexity: O(1)
     * @param {number} n 
     */
    isPrime(n) {
        return this.sieve.isTrue(n);
    }
}


class PrimeCache {

    constructor() {
        // Cache for all the prime numbers less or equal than this._max
        this._cache = [2];

        // Indicate the max number we have already searched
        this._max = 2;
    }

    /**
     * Expand cache up to integer n.
     * Time complexity: O(n loglog n)
     *   - We run sieve.crossOut() k times, k = # of primes <= n.
     *   - In the worst case, n numbers in sieve, depending on exisitng cache
     *   - So he time complexity w/o cache is
     *      O(sum_{i=2}^k (k/i)) = O(n loglog n).
     *      (cite: https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes#Computational_analysis)
     * @param {number} n 
     */
    _expand(n) {
        // First, we start from the first unknown odd number
        // we skip even numbers because we know they are not primes
        let start = this._max + 1;
        if (!odd(start)) {
            start++;
        }

        // Fill a dictionary with all unknown numbers
        const sieve = new PrimeSieve(start, n);

        // Now cross over the mulitples of the numbers in primeCache
        // we start from primeCache[1] since primceCache[0] == 2
        // and we didn't consider even numbers
        for (let i = 1; i < this._cache.length; i++) {
            sieve.crossOut(this._cache[i]);
        }

        // Now we have crossed over all the multiples for numbers already in primeCache.
        // Now, we check the numbers from [max + 1 .. n] for their multiples.
        for (let m = start; m <= n; m += 2) {

            // If m is a prime, put it into primeCache
            if (sieve.isPrime(m)) {
                this._cache.push(m);

                // and cross out all its multiples
                sieve.crossOut(m);
            }
        }

        // Log that we've already checked until n
        this._max = n;
    }

    /**
     * Return the prime numbers up to n.
     * @param {number} n 
     */
    primes(n) {
        // 200,000,000 is a practical size that memory can be allocated on my laptop. 
        // usually it takes about 10-20s to search in this range.
        const stepSize = 20000000;

        if (this._max < n) {
            let step = this._max + stepSize;
            // expand range for stepSize a time, otherwise memory allocation error
            while (step < n) {
                this._expand(step);
                step += stepSize;
            }

            if (step > n) {
                this._expand(n);
            }
        }

        return this._cache.filter(a => a < n);
    }
}

const primeCache = new PrimeCache();

/** 
 * Return prime numbers less than n.
 */
const primes = n => primeCache.primes(n);

const median = (nums) => {
    const half = Math.floor(nums.length / 2);
    if (odd(nums.length)) {
        return nums.slice(half, half + 1);
    } else {
        return nums.slice(half - 1, half + 1);
    }
}

module.exports = { odd, primes, median, PrimeCache, PrimeSieve, BitOddDict };