import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="grid place-items-center gap-2">
        <p className="text-5xl bg-main text-center">SCROLL LESS, WATCH MORE</p>
        <p className="text-xl">Your personal movie tracker</p>
        <Link href={"/myflix"}>
          <Button className="mt-8">Track your movies</Button>
        </Link>
      </div>
    </div>
  );
}
