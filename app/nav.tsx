import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  return (
    <div className="w-full grid place-items-center ">
      <div className="portrait:hidden absolute top-4 border-2 p-2 flex items-center gap-16 rounded-xl bg-white">
        <div className="flex gap-2 items-center">
          <Image
            src={"/logo.png"}
            width={64}
            height={64}
            alt="logo"
            className="h-8 w-auto"
          ></Image>
          Myflix
        </div>
        <div className="flex gap-4">
          <Link href={"/#home"}>Home</Link>

          <Link href={"/#features"}>Features</Link>
          <Link href={"/#upcoming"}>Upcoming</Link>
          <Link href={"/#license"}>License</Link>
        </div>
        <div>
          <Link href={"/addMovie"}>
            <Button variant={"noShadow"} className="hover:cursor-pointer">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
