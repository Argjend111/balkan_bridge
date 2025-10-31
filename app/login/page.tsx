import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png"


export default function Home() {
  return (
   <div className="min-h-screen w-screen flex items-center justify-center">
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Link href="/" className="flex items-center gap-2 self-center">
      <Image src={Logo} alt="logo" className="size-10"/>
        <h1 className="text-2xl font-bold">Balkan
                <span className="text-primary">Bridge</span></h1>
      </Link>
    </div>
   </div>
  );
}
