"use server";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Button} from "@/components/ui/button";
import {getMovieDetails} from "@/server/services/tmdb";
import CloseDetailsButton from "@/components/closeDetailsButton";
import {Suspense} from "react";


export default async function MovieDetails({filmId}: { filmId: number }) {
    const movieDetails = await getMovieDetails(filmId);

    if (!movieDetails) {
        return <div>Loading...</div>;
    }

    const backdropUrl = `https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`;
    const posterUrl = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;

    return (
        <Card key={movieDetails.id}
              className="relative w-full shadow-lg rounded-lg overflow-hidden m-10 flex flex-col h-full">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${backdropUrl})`,
                    filter: 'brightness(0.5) blur(10px)',
                }}
            ></div>

            {/* Poster Image Section */}
            <div className="flex flex-row z-10 p-4 justify-between">
                <div className="relative flex items-center justify-center max-w-xs h-full">
                    <img
                        src={posterUrl}
                        alt={movieDetails.title}
                        className="rounded-lg sm:w-full w-2/3 h-full object-cover"
                    />
                </div>
                <Suspense>
                    <CloseDetailsButton/>
                </Suspense>
            </div>

            {/* Card Content with Overlay Text */}
            <div className="relative z-10 mt-4 flex flex-col justify-center text-left text-white">
                <CardHeader className="mb-2">
                    <CardTitle className="text-4xl font-bold">{movieDetails.title}</CardTitle>
                    <p className="text-lg text-gray-300">{movieDetails.release_date}</p>
                </CardHeader>

                <CardContent className="flex-grow">
                    <p className="text-md text-gray-400">Original Title : {movieDetails.original_title}</p>
                    {/* TODO : Display original language as Flag. */}
                    <p className="text-sm text-gray-400">{movieDetails.original_language.toUpperCase()}</p>
                    <p className="mt-2 text-gray-400">Popularity: {movieDetails.popularity}</p>
                    <p className="mt-2 text-gray-400">Rating: {movieDetails.vote_average} / 10</p>
                    <CardDescription className="text-lg mt-4 text-gray-200">
                        {movieDetails.overview}
                    </CardDescription>
                </CardContent>

                <CardFooter className="mt-4">
                    <Button variant="outline" className="text-white">Proposer le film</Button>
                </CardFooter>
            </div>
        </Card>

    );
}