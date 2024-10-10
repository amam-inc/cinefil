"use client"
import {Button} from "@/components/ui/button";
import {MovieDetails} from "tmdb-ts";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {createClient} from "../../../utils/supabase/client";
import {toast} from "sonner";

export default function SuggestButton({movieDetails}: { movieDetails: MovieDetails }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    /**
     *
     */
    const displaySuggestions = (): void => {
        const params = new URLSearchParams(searchParams);
        params.delete("query");
        params.delete("filmId");
        router.replace(`${pathname}?${params.toString()}`);

        // TODO : Remove query inside searchbar too.
    }

    /**
     *
     * @param movie
     */
    const createdSuggestion = async (movie: MovieDetails): Promise<void> => {
        const {data, error} = await createClient().from("suggestions").insert({
            tmdb_id: movie.id,
            shownOn: null,
            createdAt: new Date().toISOString(),
        });

        if (error) {
            if (error.code == 23505) {
                toast.warning(`${movie.title} est déjà ajouté aux suggestions.`, {
                    action: {
                        label: "Voir les suggestions",
                        onClick: displaySuggestions,
                    },
                })
                return
            }

            toast.error("Impossible d'ajouter la suggestion !", {
                description: `${movie.title} n'a pas pu être ajouté aux suggestions.`,
            })
        } else {
            toast.success("Suggestion ajoutée !", {
                description: `${movie.title} a été ajouté aux suggestions.`,
                action: {
                    label: "Voir les suggestions",
                    onClick: displaySuggestions,
                },
            })
        }
    };


    return (
        <Button variant="outline" className="text-white" onClick={() => (createdSuggestion(movieDetails))}>Proposer le
            film</Button>
    )
}