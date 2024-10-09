import { auth, signIn, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
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
            <span className="sr-only">Display the menu</span>
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
                  <button type="submit">Sign out</button>
                </form>
              </DropdownMenuItem>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
              className="flex gap-2"
            >
              <button type="submit" className="flex items-center gap-2 p-2">
                <GitHubLogoIcon /> Sign in with GitHub
              </button>
            </form>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
