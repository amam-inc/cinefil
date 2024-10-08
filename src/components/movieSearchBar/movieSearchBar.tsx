import {Input} from "@/components/ui/input";
import {useMovieSearchBar} from "@/components/movieSearchBar/movieSearchBarProvider";

export function MovieSearchBar() {
    const {setQuery} = useMovieSearchBar();

    return (
        <Input
            type="text"
            placeholder="Search movies..."
            onChange={(e): void => {
                setQuery(e.target.value)
            }}
        />
    );
}
