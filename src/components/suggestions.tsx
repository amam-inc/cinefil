import {createClient} from "../../utils/supabase/server";
import React, {Suspense} from "react";
import {Suggestion} from "@/types/suggestion";
import {getMovieDetails} from "@/server/services/tmdb";
import MoviesGrid from "@/components/movie/moviesGrid";
import {Movie} from "tmdb-ts";

export default async function Suggestions() {

    /**
     * Fetch movie details for each suggestion based on tmdb_id.
     * @param suggestions
     */
    const fetchMoviesDetails = async (suggestions: Suggestion[]) => {
        const moviePromises = suggestions.map(async (suggestion) => {
            return await getMovieDetails(suggestion.tmdb_id);
        });

        return await Promise.all(moviePromises);
    };

    /**
     *
     */
    const fetchSuggestions = async () => {
        const {data, error} = await createClient().from("suggestions").select();

        if (error) {
            console.error("Error fetching suggestions:", error);
            // TODO : Add error handlingg.
            return <>{error}</>;
        }

        if (data && data.length > 0) {
            return fetchMoviesDetails(data as Suggestion[]);
        }
    }

    return (
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-center mt-4">Suggestions des utilisateurs</h1>
            <Suspense>
                <MoviesGrid movies={await fetchSuggestions() as Movie[]} forSuggestions={true}/>
            </Suspense>
        </div>
    );
}