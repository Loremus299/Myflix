import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function NavMobile() {
  return (
    <div className="pt-4 landscape:hidden" id="home">
      <Accordion type="single" collapsible className="w-full ">
        <AccordionItem value="item-1" className="rounded-none">
          <AccordionTrigger>Navbar</AccordionTrigger>
          <AccordionContent className="grid gap-2">
            <Link href={"/#home"}>Home</Link>
            <Link href={"/#features"}>Features</Link>
            <Link href={"/#upcoming"}>Upcoming</Link>
            <Link href={"/#license"}>License</Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
