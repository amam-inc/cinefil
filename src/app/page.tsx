'use client';
import MoviesGrid from "@/components/moviesGrid";
import {MovieSearchBarProvider} from "@/components/movieSearchBar/movieSearchBarProvider";
import {MovieSearchBar} from "@/components/movieSearchBar/movieSearchBar";
import Suggestions from "@/components/suggestions";

export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white p-4">
            <MovieSearchBarProvider>
                <MovieSearchBar/>
                <MoviesGrid/>
            </MovieSearchBarProvider>

            <Suggestions />
        </main>
    );
}
