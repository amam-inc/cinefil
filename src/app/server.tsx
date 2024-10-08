"use server";

import { searchMovies } from "@/server/services/tmdb";
import { Movie, Search } from "tmdb-ts";

export default async function MoviesGrid({ query }: { query: string }) {
  const movies: Search<Movie> = await searchMovies(query);

  return (
    <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {movies.results.map((movie: Movie) => (
        <div
          key={movie.id}
          className="flex flex-col items-center rounded-lg bg-gray-800 p-4 shadow-lg"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="mb-4 h-auto w-full rounded-lg"
          />
          <h2 className="text-center text-xl font-semibold">{movie.title}</h2>
          <p className="text-center text-sm">{movie.release_date}</p>
        </div>
      ))}
    </div>
  );
}
