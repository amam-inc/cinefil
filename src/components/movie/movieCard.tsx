"use client";

import SuggestButton from "@/components/customButtons/suggestButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { type Movie, type MovieDetails } from "tmdb-ts";
import { useDebouncedCallback } from "use-debounce";

export default function MoviesCard({ movie }: { movie: Movie }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const selectMovie = useDebouncedCallback((filmId: number): void => {
    const params = new URLSearchParams(searchParams);

    if (filmId) {
      params.set("filmId", filmId.toString());
    } else {
      params.delete("filmId");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Card
      key={movie.id}
      onClick={(): void => {
        selectMovie(movie.id);
      }}
    >
      <CardContent>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg p-4"
        />
      </CardContent>
      <CardHeader>
        <CardTitle className={"text-xl"}>{movie.title}</CardTitle>
        <p className="text-start text-sm text-gray-500">{movie.release_date}</p>
      </CardHeader>
      <CardFooter>
        <SuggestButton movieDetails={movie as unknown as MovieDetails} />
      </CardFooter>
    </Card>
  );
}
