import { githubLogin, googleLogin } from "@/app/login/actions";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function SignIn() {
    return (
        <form className="flex gap-2">
            <button type="submit" className="flex gap-2 p-2 items-center" formAction={ githubLogin }><GitHubLogoIcon/> Sign in with GitHub</button>
            <button type="submit" className="flex gap-2 p-2 items-center" formAction={ googleLogin }> Sign in with Google</button>
        </form>
    )
}