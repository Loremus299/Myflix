import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function NavMobile() {
  return (
    <div id="home" className="fixed pt-4 right-4 landscape:hidden">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="rounded-t-none">
          <AccordionTrigger></AccordionTrigger>
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
