"use server";
import {Movie} from 'tmdb-ts';
import MoviesCard from "@/components/movie/movieCard";

export default async function MoviesGrid({movies, filmId, forSuggestions}: { movies: Movie[], filmId?: number , forSuggestions: boolean}) {
    return (
        <div
            className={`grid gap-6 w-full p-10 ${
                filmId ? 'lg:grid-cols-3 grid-cols-1 sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-6'
            }`}>
            {movies ? movies.map((movie: Movie) => (
                <MoviesCard movie={movie} key={movie.id} hasBeenSuggested={forSuggestions}/>
            )) : <> {/* TODO : Implement fallback. */} </>}
        </div>
    );
}

