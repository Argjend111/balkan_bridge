import Link from "next/link";
import Logo from "@/public/logo.png"
import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import { ModeToggle } from "./ThemeToggle";
import { auth, signOut } from "@/app/utils/auth";
import { redirect } from "next/dist/server/api-utils";


export async function Navbar() {
    const session = await auth()
    return (
        <nav className="flex items-center justify-between py-5">
            <Link href="/" className="flex items-center gap-2">
                <Image src={Logo} alt="logo" width={40} height={40} />
                <h1 className="text-2xl font-bold">Balkan
                    <span className="text-primary">Bridge</span></h1>
            </Link>
            <div className="flex items-center gap-4">
                <ModeToggle />
                {session?.user ? (
                    <form action={async () => {
                        "use server"
                        await signOut({ redirectTo: "/" });
                    }}>
                        <Button>LogOut</Button>
                    </form>
                ) : (
                    <Link href="/login" className={buttonVariants({variant:'outline', size:'lg'})}>
                        Login
                    </Link>
                )}
            </div>
        </nav>
    )
}