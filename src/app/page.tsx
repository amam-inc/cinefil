import MovieDetails from "@/components/movie/movieDetails";
import MoviesGrid from "@/components/movie/moviesGrid";
import { Suspense } from "react";

export default function HomePage({
  searchParams,
}: {
  searchParams?: { query?: string; filmId?: string };
}) {
  const query: string = searchParams?.query ?? "";
  const filmId: string | undefined = searchParams?.filmId;

  return (
    <main className="flex flex-col items-center justify-center p-4 text-white">
      <div className="flex flex-row items-start justify-center">
        <Suspense key={query} fallback={<div>Loading...</div>}>
          <MoviesGrid query={query} filmId={Number(filmId)} />
        </Suspense>

        {filmId && query ? (
          <Suspense fallback={<div>Loading details...</div>}>
            <MovieDetails filmId={Number(filmId)} />
          </Suspense>
        ) : null}
      </div>
    </main>
  );
}
