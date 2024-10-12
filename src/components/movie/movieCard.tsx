"use client";

import SuggestButton from "@/components/customButtons/suggestButton";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {type Movie, type MovieDetails} from "tmdb-ts";
import {useDebouncedCallback} from "use-debounce";
import React from "react";
import {getHumanReadableDate, getYearOnly} from "@/utils/date";
import {SearchParams} from "@/app/searchParams";

export default function MoviesCard(
    {movie, hasBeenSuggested, shownOn}:
        { movie: Movie; hasBeenSuggested: boolean; shownOn?: string | undefined }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const selectMovie = useDebouncedCallback((filmId: number): void => {
        const params = new URLSearchParams(searchParams);

        if (filmId) {
            params.set(SearchParams.FILM_ID, filmId.toString());
        } else {
            params.delete(SearchParams.FILM_ID);
        }

        router.replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <Card
            key={movie.id}
        >
            <div onClick={(): void => selectMovie(movie.id)}>
                <CardContent>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className={`rounded-lg p-4 ${shownOn ? 'grayscale opacity-50' : ''}`}
                    />
                </CardContent>
                <CardHeader>
                    <CardTitle className={"text-xl"}>{movie.title}</CardTitle>
                    <p className="text-start text-sm text-gray-500">{getYearOnly(movie.release_date)}</p>
                    {shownOn ? <p className="text-start text-sm text-red-500 font-bold pt-8">
                        Diffusé lors de la séance du : {getHumanReadableDate(shownOn)}
                    </p> : null}
                </CardHeader>
            </div>
            <CardFooter>
                {hasBeenSuggested || shownOn ? (
                    <>{/* TODO : Add Vote Button. */}</>
                ) : (
                    <SuggestButton movieDetails={movie as unknown as MovieDetails}/>
                )}
            </CardFooter>
        </Card>
    );
}