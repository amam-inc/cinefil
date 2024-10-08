import React, {createContext, ReactNode, useContext, useState} from 'react'

interface MovieSearchBarContextValue {
    query: string
    setQuery: React.Dispatch<React.SetStateAction<string>>
}

const MovieSearchBarContext = createContext<MovieSearchBarContextValue | null>(null)


export function useMovieSearchBar(): MovieSearchBarContextValue {
    const context = useContext(MovieSearchBarContext)
    if (!context) {
        throw new Error('useMovieSearchBar must be used within a MovieSearchBarProvider')
    }
    return context
}

export function MovieSearchBarProvider({children}: { children: ReactNode }) {
    const [query, setQuery] = useState<string>("")

    const value: MovieSearchBarContextValue = {
        query: query,
        setQuery: setQuery,
    }

    return (<MovieSearchBarContext.Provider value={value}>{children}</ MovieSearchBarContext.Provider>
    )
}