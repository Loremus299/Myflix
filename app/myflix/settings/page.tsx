import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Options from "./options";

export default function Page() {
  return (
    <div>
      <div className="grid place-items-center p-4 min-h-screen portrait:hidden">
        <Card className="max-w-240 w-full p-4 bg-white">
          <Options />
        </Card>
        <Link href="/myflix" className="fixed bottom-8 right-8 ">
          <Button className="bg-white">
            <ArrowLeft />
          </Button>
        </Link>
      </div>
      <div className="landscape:hidden p-4">
        <Options />
        <Link href="/myflix" className="fixed bottom-8 right-8">
          <Button>
            <ArrowLeft />
          </Button>
        </Link>
      </div>
    </div>
  );
}
