import {Movie, MovieDetails} from "tmdb-ts";
import {toast} from "sonner";
import {createClient} from "../../utils/supabase/client";

export const createdSuggestion = async (movie: MovieDetails): Promise<void> => {
    const {data, error} = await createClient().from("suggestions").insert({
        tmdb_id: movie.id,
        shownOn: null,
        createdAt: new Date().toISOString(),
    });

    if (error) {
        if(error.code == 23505){
            toast.warning(`${movie.title} est déjà ajouté aux suggestions.`, {
                action: {
                    label: "Voir les suggestions",
                    // TODO : Implement display existing suggestions.
                    onClick: () => console.log("Voir les suggestions"),
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
                // TODO : Implement display existing suggestions.
                onClick: () => console.log("Voir les suggestions"),
            },
        })
    }
};