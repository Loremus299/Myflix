"use client";
import { deleteMovie, MovieStatus, readMovies, updateStatus } from "@/db";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Clapperboard, Calendar, Star, ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const client = useQueryClient();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id);
  const { status, data: alldata } = useQuery({
    queryKey: ["movies"],
    queryFn: () => readMovies(),
    staleTime: Infinity,
  });

  const { mutate: changeStatus } = useMutation({
    mutationKey: ["movies"],
    mutationFn: (status: MovieStatus) => updateStatus(id, status),
    onSuccess: () => client.invalidateQueries({ queryKey: ["movies"] }),
  });

  const { mutate: removeMovie } = useMutation({
    mutationKey: ["movies"],
    mutationFn: () => {
      deleteMovie(id);
      return Promise.resolve();
    },
    onSuccess: () => router.push("/myflix"),
  });

  if (status == "error") {
    router.push("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    return null;
  }

  if (alldata == undefined) {
    return <div>Loading</div>;
  }

  const data = alldata.find((element) => element.id == id);

  if (data == undefined) {
    router.push("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    return null;
  }

  return (
    <div className="flex portrait:flex-col">
      <Image
        className="landscape:h-screen portrait:max-h-screen w-auto portrait:w-full portrait:fixed"
        src={data.poster}
        width={1080}
        height={1600}
        alt={data.name}
      ></Image>
      <div className="portrait:h-screen"></div>
      <div className="space-y-3 portrait:p-4 z-20 d p-8 w-full portrait:bg-white">
        <h1 className="text-3xl">{data.name}</h1>
        <div className="flex space-x-8 flex-wrap space-y-2">
          <p className="flex">
            <Clapperboard className="mr-2" />
            {data.director}
          </p>
          <p className="flex">
            <Calendar className="mr-2" />
            {data.year}
          </p>
          <p className="flex">
            <Star className="mr-2" />
            {data.imdbRating}
          </p>
        </div>
        <div className="flex gap-2">
          <MapPin />
          <p>{data.country.join(", ")}</p>
        </div>
        <p>{data.plot}</p>
        <p>{data.genre.join(", ")}</p>
        <div>
          <div className="flex w-full portrait:justify-center">
            <div className="inline-flex rounded-base border-2 border-border overflow-hidden">
              <Button
                className={`rounded-none border-0 ${
                  data.status === "pending"
                    ? "bg-main text-main-foreground"
                    : "bg-secondary-background text-foreground hover:bg-secondary-background"
                }`}
                onClick={() => changeStatus("pending")}
                variant="noShadow"
              >
                Pending
              </Button>
              <Button
                className={`rounded-none border-0 border-l-2 border-border ${
                  data.status === "watching"
                    ? "bg-main text-main-foreground"
                    : "bg-secondary-background text-foreground hover:bg-secondary-background"
                }`}
                onClick={() => changeStatus("watching")}
                variant="noShadow"
              >
                Watching
              </Button>
              <Button
                className={`rounded-none border-0 border-l-2 border-border ${
                  data.status === "watched"
                    ? "bg-main text-main-foreground"
                    : "bg-secondary-background text-foreground hover:bg-secondary-background"
                }`}
                onClick={() => changeStatus("watched")}
                variant="noShadow"
              >
                Watched
              </Button>
            </div>
          </div>
          <Button
            className="w-full mt-4"
            variant={"neutral"}
            onClick={() => {
              removeMovie();
            }}
          >
            Delete from List
          </Button>{" "}
          <Link href={"/myflix"}>
            <Button className="mt-4 landscape:hidden float-right">
              <ArrowLeft></ArrowLeft>
            </Button>
          </Link>
        </div>
        <div className="portrait:hidden">
          <Link href={"/myflix"} className="bottom-8 absolute right-8">
            <Button>
              <ArrowLeft></ArrowLeft>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
