"use server"

import { githubLogin, googleLogin } from '@/app/login/actions'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default async function LoginPage() {
    const supabase = createClient()
    const {data, error} = await supabase.auth.getUser()
    
    console.log(error)
    
    return (
        <div className="pt-20 flex items-center justify-center h-screen">
            <Card className="w-[500px] flex flex-col items-center">
                <CardHeader className="items-center">
                    <CardTitle className="text-xl font-bold">cinéfil</CardTitle>
                    <CardDescription>Hi! Sign in to continue</CardDescription>
                </CardHeader>
                <CardContent className="w-full">
                    <form className="flex flex-col gap-2">
                        <Button variant="outline" className="flex gap-2 p-2 items-center" formAction={ githubLogin }><GitHubLogoIcon/> Sign in with GitHub</Button>
                        <Button variant="outline" className="flex gap-2 p-2 items-center" formAction={ googleLogin }> Sign in with Google</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}