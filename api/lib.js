/**
 * A library for retrieving prime numbers.
 * This library will cache calculated results.
 */

const odd = (n) => !!(n % 2);

class PrimeSieve {

    constructor(min, max) {
        this.sieve = {};
        if (!odd(min)) {
            min++;
        }

        this.min = min;
        this.max = max;

        for (let i = min; i <= max; i += 2) {
            this.sieve[i] = true;
        }
    }

    /**
     * Cross out all the multiples from dict.
     * @param {number} num
     */
    crossOut(num) {

        let k = Math.floor(this.min / num);
        if (!odd(k)) {
            // we don't want to try even multiplications
            // because they are not in board
            k++;
        }

        while (k * num <= this.max) {
            this.sieve[k * num] = false;
            k += 2;
        }
    }

    isPrime(n) {
        return !!this.sieve[n];
    }
}


class PrimeCache {

    constructor() {
        this._cache = [2];
    }

    /**
     * Expand cache up to integer n.
     * @param {number} n 
     */
    _expand(n) {
        let maxPrime = this.max();
        // Otherwise, we are not sure if there are still prime numbers
        // in (primeCache[-1] .. n), try to find them

        // First, we start from the first unknown odd number
        // we skip even numbers because we know they are not primes
        let start = maxPrime + 1;
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
        // Now, we check the numbers from [maxPrime + 1 .. n] for their multiples.
        for (let m = start; m <= n; m += 2) {

            // If m is a prime, put it into primeCache
            if (sieve.isPrime(m)) {
                this._cache.push(m);

                // and cross out all its multiples
                sieve.crossOut(m);
            }
        }

    }

    max() {
        return this._cache[this._cache.length - 1];
    }

    /**
     * Return the prime numbers up to n.
     * @param {number} n 
     */
    primes(n) {
        let maxPrime = this.max()
        if (maxPrime < n) {
            this._expand(n);
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

module.exports = { odd, primes, median };