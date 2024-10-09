"use server";

import {Movie, Search} from 'tmdb-ts';
import {searchMovies} from "@/server/services/tmdb";
import MoviesCard from "@/components/movie/movieCard";

export default async function MoviesGrid({query, filmId}: { query: string, filmId: number }) {
    const movies: Search<Movie> = await searchMovies(query);

    return (
        <div
            className={`grid gap-6 w-full m-10 ${
                filmId ? 'grid-cols-3 lg:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-6'
            }`}>
            {movies.results.map((movie: Movie) => (
                <MoviesCard movie={movie} key={movie.id}/>
            ))}
        </div>
    );
}

