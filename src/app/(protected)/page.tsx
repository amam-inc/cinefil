import MovieDetails from "@/components/movie/movieDetails";
import MoviesGrid from "@/components/movie/moviesGrid";
import Suggestions from "@/components/suggestions";
import { searchMovies } from "@/server/services/tmdb";
import { Suspense } from "react";

export default async function HomePage({searchParams}: { searchParams?: { query?: string; filmId?: string; }; }) {
    const query: string = searchParams?.query ?? '';
    const filmId: string | undefined = searchParams?.filmId;
    
    return (
        <Suspense>
            <main className="flex flex-col items-center justify-center p-4 text-white">
                <div className="flex flex-row items-start justify-center mt-20">
                    { !query ? (
                        <Suggestions/>
                    ) : (
                        <Suspense key={ query } fallback={ <div>Loading...</div> }>
                            <MoviesGrid movies={ (await searchMovies(query)).results } filmId={ Number(filmId) }
                                        forSuggestions={ false }/>
                        </Suspense>) }
                    
                    { filmId ? (
                        <Suspense key={ filmId } fallback={ <div>Loading details...</div> }>
                            <MovieDetails filmId={ Number(filmId) }/>
                        </Suspense>
                    ) : null }
                </div>
            
            </main>
        </Suspense>
    );
}
