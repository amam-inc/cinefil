import { signOut } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

/**
 * Account dropdown.
 * Contains the account dropdown component, with the username and sign out button (if applicable).
 * @constructor
 */
export default async function AccountDropdown() {
    const supabase = createClient()
    
    const {data, error} = await supabase.auth.getUser()
    
    return (
        <div className="flex items-center gap-4">
            <div>{ data ? <b>{ data?.user?.user_metadata.name }</b> : null }</div>
            { data?.user ? (
                <form><Button variant="outline" formAction={ signOut }>Sign out</Button></form>
            ) : (
                <Link href={ "/login" }><Button variant="outline">Sign in</Button></Link>
            ) }
        </div>
    );
}
