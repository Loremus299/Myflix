import FeatureCard from "./featureCard";

export default function Features() {
  return (
    <div
      className="grid gap-8 grid-cols-3 grid-rows-3 mb-8 pt-4 portrait:grid-cols-1 portrait:grid-rows-1"
      id="features"
    >
      <FeatureCard className={"landscape:col-span-2"}>
        <h1 className="text-2xl mb-2">No sign up needed</h1>
        <p>
          The entire app can be used without any sign up, no features hidden
          behind logging in and sharing your personal information to myflix.
        </p>
      </FeatureCard>
      <FeatureCard className={""}>
        <h1 className="text-2xl mb-2">IMDB catalog</h1>
        <p>Any movie on the IMDB list can be added to your library.</p>
      </FeatureCard>
      <FeatureCard className={"landscape:row-span-2"}>
        <h1 className="text-2xl mb-2">Personal rating</h1>
        <p>
          Rate each and every movie in your library a personal score. (Upcoming
          feature)
        </p>
      </FeatureCard>
      <FeatureCard className={""}>
        <h1 className="text-2xl mb-2">Local First</h1>
        <p>
          Myflix uses your browser to store data. Allowing you to control and
          own your data.
        </p>
      </FeatureCard>
      <FeatureCard className={""}>
        <h1 className="text-2xl mb-2">Organize the clutter</h1>
        <p>
          Filter and browse through every single movie in your catalog with many
          options.
        </p>
      </FeatureCard>
      <FeatureCard className={"landscape:col-span-2"}>
        <h1 className="text-2xl mb-2">Free & Open Source</h1>
        <p>
          Myflix is a free and open source app licensed under the Gay Agenda
          License 1.0.
        </p>
      </FeatureCard>
    </div>
  );
}
