import { auth, signOut } from "@/auth";
import SignIn from "@/components/signIn";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CircleUser } from "lucide-react";

/**
 * Account dropdown.
 * Contains the account dropdown component, with the username and sign out button (if applicable).
 * @constructor
 */
export default async function AccountDropdown() {
  const session = await auth();

  return (
    <div className="flex items-center gap-4">
      <div>{session ? <b>{session?.user?.name}</b> : null}</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Afficher le menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" asChild>
          {session?.user ? (
            <>
              <DropdownMenuLabel>
                {session?.user?.name ?? "Cédric ?"}
              </DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer">
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <button type="submit">Se déconnecter</button>
                </form>
              </DropdownMenuItem>
            </>
          ) : (
            <SignIn />
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
