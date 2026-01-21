import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4">
      <Link className="mb-4" href={"/myflix"}>
        <Button className="mb-4">Get Started</Button>
      </Link>
      <p>I need to make a home screen here pitching my app soon :3</p>
    </div>
  );
}
