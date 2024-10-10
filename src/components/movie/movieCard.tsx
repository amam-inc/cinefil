'use client';

import {Movie, MovieDetails} from 'tmdb-ts';
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";
import SuggestButton from "@/components/customButtons/suggestButton";

export default function MoviesCard({movie, hasBeenSuggested}: { movie: Movie, hasBeenSuggested: boolean }) {
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
        <Card key={movie.id} onClick={(): void => {
            selectMovie(movie.id)
        }}>
            <CardContent>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="p-4 rounded-lg"
                />
            </CardContent>
            <CardHeader>
                <CardTitle className={"text-xl"}>{movie.title}</CardTitle>
                <p className="text-sm text-start text-gray-500">{movie.release_date}</p>
            </CardHeader>
            <CardFooter>
                {hasBeenSuggested ? <>{ /* TODO : Add Vote Button. */}</> :
                    <SuggestButton movieDetails={movie as unknown as MovieDetails}/>
                }
            </CardFooter>
        </Card>
    );
}
