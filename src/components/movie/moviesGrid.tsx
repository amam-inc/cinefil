"use server";
import {Movie} from 'tmdb-ts';
import MoviesCard from "@/components/movie/movieCard";

export default async function MoviesGrid({movies, filmId}: { movies: Movie[], filmId?: number }) {
    return (
        <div
            className={`grid gap-6 w-full m-10 ${
                filmId ? 'lg:grid-cols-3 grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-6'
            }`}>
            {movies.map((movie: Movie) => (
                <MoviesCard movie={movie} key={movie.id}/>
            ))}
        </div>
    );
}

