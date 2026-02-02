import FeatureCard from "./featureCard";

export default function Upcoming() {
  return (
    <div id="upcoming" className="grid gap-4">
      <h1 className="text-3xl">Upcoming</h1>
      <FeatureCard className="">
        Add tags to github and git.gay repo
      </FeatureCard>
      <FeatureCard className="">404 Page</FeatureCard>
      <FeatureCard className="">
        Context menu on image card to mark movie completed, pending, watched or
        delete it
      </FeatureCard>
    </div>
  );
}
