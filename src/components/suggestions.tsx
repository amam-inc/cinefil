'use client';

import {createClient} from "../../utils/supabase/client";
import {useEffect, useState} from "react";

export default function Suggestions() {
    const [data, setData] = useState<any>(null);

    const supabase = createClient();

    const fetchData = async () => {
        const {data, error} = await supabase.from("suggestions").select();

        if (error) {
            console.error("Error fetching suggestions:", error);
            return;
        }

        setData(data);
    };

    useEffect((): void => {
        fetchData();
    }, [supabase]);

    return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
