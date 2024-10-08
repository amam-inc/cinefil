'use server'
import {Movie, Search, TMDB} from 'tmdb-ts';
import {RateLimiterMemory} from 'rate-limiter-flexible';

const tmdb: TMDB = new TMDB(process.env.TMDB_API_TOKEN as string);

// Rate limiter configuration : limit to 15 requests per minute.
const rateLimiter = new RateLimiterMemory({
    points: 15, // Number of requests.
    duration: 60, // Per 60 seconds (1 minute).
});

/**
 * TMDB Service to search for movies.
 * @param query
 */
export const searchMovies = async (query: string): Promise<Search<Movie>> => {
    // Use rate limiter to prevent excessive calls.
    try {
        await rateLimiter.consume(query);

        // Will throw an error if rate limit exceeded.
    } catch (rateLimitError) {
        throw new Error('Too many requests, please try again later.');
    }

    try {
        // Call the TMDB API.
        return await tmdb.search.movies({query});
    } catch (err) {
        // Handle TMDB API errors.
        console.error('Error fetching movies:', err);
        throw new Error('Failed to fetch movies from TMDB.');
    }
};
