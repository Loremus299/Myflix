import ImageCard from "@/components/ui/image-card";
import { getOrder, Movie, MovieStatus } from "@/db";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { sort } from "./script";

export default function MovieDisplay(props: { data: Movie[] }) {
  const { data: order } = useQuery({
    queryKey: ["order"],
    queryFn: getOrder,
    staleTime: Infinity,
  });
  const groupMoviesByStatus = (movies: Movie[]) => {
    const grouped: Record<MovieStatus, Movie[]> = {
      pending: [],
      watching: [],
      watched: [],
    };

    movies.forEach((movie) => {
      grouped[movie.status].push(movie);
    });

    return grouped;
  };

  const groupedMovies = props.data
    ? groupMoviesByStatus(props.data)
    : {
        pending: [],
        watching: [],
        watched: [],
      };

  const statusLabels: Record<MovieStatus, string> = {
    pending: "Pending",
    watching: "Watching",
    watched: "Watched",
  };

  const statusOrder: MovieStatus[] = ["watching", "pending", "watched"];
  return (
    <div className="space-y-8">
      {statusOrder.map((status) => {
        const movies = groupedMovies[status];
        if (movies.length === 0) return null;

        return (
          <div key={status} className="space-y-4">
            <h2 className="text-2xl font-bold">
              {statusLabels[status]} ({movies.length})
              <div className="border mt-2"></div>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 portrait:w-full h-min">
              {sort(order!, movies).map((item) => (
                <Link key={item.id ?? -1} href={`/myflix/${item.id ?? -1}`}>
                  <ImageCard
                    className="w-full"
                    caption={item.name}
                    imageUrl={item.poster}
                  ></ImageCard>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
