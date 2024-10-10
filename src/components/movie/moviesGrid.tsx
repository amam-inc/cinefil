"use server";
import MoviesCard from "@/components/movie/movieCard";
import { type Movie } from "tmdb-ts";

export default async function MoviesGrid({movies, filmId, forSuggestions}: { movies: Movie[]; filmId?: number; forSuggestions: boolean; }) {
    return (
        <div
            className={ `grid w-full gap-6 p-10 ${
                filmId
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-2 sm:grid-cols-4 lg:grid-cols-6"
            }` }
        >
            { movies ? (
                movies.map((movie: Movie) => (
                    <MoviesCard
                        movie={ movie }
                        key={ movie.id }
                        hasBeenSuggested={ forSuggestions }
                    />
                ))
            ) : (
                <> {/* TODO : Implement fallback. */ } </>
            ) }
        </div>
    );
}
