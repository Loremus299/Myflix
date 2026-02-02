import Features from "./features";
import Hero from "./hero";
import License from "./license";
import Nav from "./nav";
import NavMobile from "./navMobile";
import Upcoming from "./upcoming";

export default function Home() {
  return (
    <div className="pl-4 pr-4">
      <Nav />
      <NavMobile />
      <Hero />
      <Features />
      <Upcoming />
      <License />
    </div>
  );
}
