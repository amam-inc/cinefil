"use client"
import {Button} from "@/components/ui/button";
import {createdSuggestion} from "@/server/actions";
import {MovieDetails} from "tmdb-ts";

export default function SuggestButton({movieDetails}: { movieDetails: MovieDetails }) {
    return (
        <Button variant="outline" className="text-white" onClick={() => (createdSuggestion(movieDetails))}>Proposer le film</Button>
    )
}