import {Suspense} from "react";
import MoviesGrid from "@/components/movie/moviesGrid";
import Search from "@/components/search";
import MovieDetails from "@/components/movie/movieDetails";
import Suggestions from "@/components/suggestions";
import {searchMovies} from "@/server/services/tmdb";

export default async function HomePage({
                                           searchParams,
                                       }: {
    searchParams?: { query?: string; filmId?: string; };
}) {

    const query: string = searchParams?.query ?? '';
    const filmId: string | undefined = searchParams?.filmId;

    return (
        <main className="flex flex-col items-center justify-center p-4 text-white">
            <Search placeholder={"Search movies..."}/>

            <div className="flex flex-row items-start justify-center">
                <Suspense key={query} fallback={<div>Loading...</div>}>
                    <MoviesGrid movies={(await searchMovies(query)).results} filmId={Number(filmId)}/>
                </Suspense>

                {filmId && query && (
                    <Suspense key={filmId} fallback={<div>Loading details...</div>}>
                        <MovieDetails filmId={Number(filmId)}/>
                    </Suspense>
                )}
            </div>

            {!query ? (
                <Suggestions/>
            ) : null}
        </main>
    );
}
