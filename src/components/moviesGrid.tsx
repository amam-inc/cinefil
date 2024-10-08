'use client';

import {useCallback, useEffect, useState} from 'react';
import {searchMovies} from '@/server/services/tmdb';
import {Movie, Search} from 'tmdb-ts';
import {debounce} from "next/dist/server/utils";
import {useMovieSearchBar} from "@/components/movieSearchBar/movieSearchBarProvider";

export default function MoviesGrid() {
    const [movies, setMovies] = useState<Movie[]>([]);

    const {query} = useMovieSearchBar()

    /**
     * Fetch movies data.
     */
    const getMoviesData = useCallback(
        debounce(async (): Promise<void> => {
            const movieSearchResult: Search<Movie> = await searchMovies(query);
            setMovies(movieSearchResult.results);
        }, 300),
        [query]
    );

    useEffect((): void => {
        if (query == "") {
            setMovies([])

            // TODO : Add message to invite user to search for a movie ?
            return
        }

        getMoviesData();
    }, [getMoviesData, query]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {movies.map((movie: Movie) => (
                <div
                    key={movie.id}
                    className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center"
                >
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-auto mb-4 rounded-lg"
                    />
                    <h2 className="text-xl font-semibold text-center">{movie.title}</h2>
                    <p className="text-sm text-center">{movie.release_date}</p>
                </div>
            ))}
        </div>
    );
}
