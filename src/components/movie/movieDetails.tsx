"use server";
import CloseDetailsButton from "@/components/customButtons/closeDetailsButton";
import SuggestButton from "@/components/customButtons/suggestButton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getMovieDetails } from "@/server/services/tmdb";
import Image from "next/image";

export default async function MovieDetails({filmId}: { filmId: number }) {
    const movieDetails = await getMovieDetails(filmId);
    
    if (!movieDetails) {
        return <div>Loading...</div>;
    }
    
    const backdropUrl = `https://image.tmdb.org/t/p/w1280${ movieDetails.backdrop_path }`;
    const posterUrl = `https://image.tmdb.org/t/p/w500${ movieDetails.poster_path }`;
    
    return (
        <Card
            key={ movieDetails.id }
            className="relative m-10 flex h-full w-full flex-col overflow-hidden rounded-lg shadow-lg"
        >
            {/* Background Image with Overlay */ }
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={ {
                    backgroundImage: `url(${ backdropUrl })`,
                    filter: "brightness(0.5) blur(10px)"
                } }
            ></div>
            
            {/* Poster Image Section */ }
            <div className="z-10 flex flex-row justify-between p-4">
                <div className="relative flex h-full max-w-xs items-center justify-center">
                    <Image
                        src={ posterUrl }
                        alt={ movieDetails.title }
                        className="h-full w-2/3 rounded-lg object-cover sm:w-full"
                    />
                </div>
                <CloseDetailsButton/>
            </div>
            
            {/* Card Content with Overlay Text */ }
            <div className="relative z-10 mt-4 flex flex-col justify-center text-left text-white">
                <CardHeader className="mb-2">
                    <CardTitle className="text-4xl font-bold">
                        { movieDetails.title }
                    </CardTitle>
                    <p className="text-lg text-gray-300">{ movieDetails.release_date }</p>
                </CardHeader>
                
                <CardContent className="flex-grow">
                    <p className="text-md text-gray-400">
                        Original Title : { movieDetails.original_title }
                    </p>
                    {/* TODO : Display original language as Flag. */ }
                    <p className="text-sm text-gray-400">
                        { movieDetails.original_language.toUpperCase() }
                    </p>
                    <p className="mt-2 text-gray-400">
                        Popularity: { movieDetails.popularity }
                    </p>
                    <p className="mt-2 text-gray-400">
                        Rating: { movieDetails.vote_average } / 10
                    </p>
                    <CardDescription className="mt-4 text-lg text-gray-200">
                        { movieDetails.overview }
                    </CardDescription>
                </CardContent>
                
                <CardFooter className="mt-4">
                    <SuggestButton movieDetails={ movieDetails }/>
                </CardFooter>
            </div>
        </Card>
    );
}
