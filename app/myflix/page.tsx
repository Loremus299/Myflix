"use client";
import { Movie, MovieStatus, readMovies } from "@/db";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ImageCard from "@/components/ui/image-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";
import { CirclePlus, Settings } from "lucide-react";

export default function Page() {
  const client = useQueryClient();
  const [dataRef, setDataRef] = useState<Movie[] | undefined>(undefined);
  const [value, setValue] = useState<number[]>([0]);
  const { status, data } = useQuery({
    queryKey: ["movies"],
    queryFn: () => readMovies(),
    staleTime: Infinity,
  });

  useEffect(() => {
    client.refetchQueries({ queryKey: ["movies"] });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDataRef(data);
  }, [status, data, client]);

  if (status == "error") {
    return <div>Error</div>;
  }
  if (status == "pending") {
    return <div>Loading</div>;
  }

  const directorsData = data.map((item) => item.director);
  const s = new Set(directorsData);
  const directors = [...s];

  const genresData = data.map((item) => item.genre);
  const x = genresData.flatMap((item) => item);
  const genresmid = x.map((item) => item.trim());
  const S = new Set(genresmid);
  const genres = [...S];

  const countriesData = data.map((item) => item.country);
  const y = countriesData.flatMap((item) => item);
  const countriesmid = y.map((item) => item.trim());
  const V = new Set(countriesmid);
  const countries = [...V];

  const clearFilters = () => {
    setDataRef(data);
    setValue([0]);
  };

  const filter = (form: HTMLFormElement) => {
    const fdata = new FormData(form);
    let copyofData = data;

    const filterName = fdata.get("movieName") as string;
    if (filterName !== "") {
      copyofData = copyofData.filter((item) =>
        item.name.toLowerCase().includes(filterName.toLowerCase()),
      );
    }

    const filterStatus = fdata.get("watchStatus") as string;
    if (filterStatus !== "") {
      copyofData = copyofData.filter((item) => {
        return item.status == filterStatus;
      });
    }

    const filterDirector = fdata.get("director") as string;
    if (filterDirector !== "") {
      copyofData = copyofData.filter((item) => item.director == filterDirector);
    }

    const filterCountry = fdata.get("country") as string;
    if (filterCountry !== "") {
      copyofData = copyofData.filter((item) =>
        item.country.map((item) => item.trim()).includes(filterCountry),
      );
    }

    const filterGenre = fdata.get("genre") as string;
    if (filterGenre !== "") {
      copyofData = copyofData.filter((item) =>
        item.genre.map((item) => item.trim()).includes(filterGenre),
      );
    }

    const filterMinRating = fdata.get("minimumRating") as string;
    if (filterMinRating !== "") {
      const num = parseInt(filterMinRating);
      copyofData = copyofData.filter((item) => item.imdbRating > num);
    }

    setDataRef(copyofData);
  };

  // Group movies by status
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

  const groupedMovies = dataRef
    ? groupMoviesByStatus(dataRef)
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
    <div className="p-4">
      <div className="mb-4">
        <div className="flex gap-4">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="w-full">Filter</Button>
            </AlertDialogTrigger>
            {dataRef && dataRef.length !== data.length && (
              <Button
                variant="neutral"
                onClick={clearFilters}
                className="whitespace-nowrap"
              >
                Clear Filters
              </Button>
            )}
            <AlertDialogContent>
              <AlertDialogHeader className="text-left">
                <AlertDialogTitle>Filter</AlertDialogTitle>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    filter(e.currentTarget);
                  }}
                >
                  <div className="flex flex-col gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="movieName">Search</Label>
                      <Input
                        name="movieName"
                        placeholder="search by name"
                      ></Input>
                    </div>
                    <div className="grid gap-2">
                      <Label>Watch Status</Label>
                      <Select name="watchStatus">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Watch Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="watching">Watching</SelectItem>
                            <SelectItem value="watched">Watched</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Director</Label>
                      <Select name="director">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Director" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {directors.map((director) => (
                              <SelectItem key={director} value={director}>
                                {director}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Genre</Label>
                      <Select name="genre">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {genres.map((genre) => (
                              <SelectItem key={genre} value={genre}>
                                {genre}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Country</Label>
                      <Select name="country">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="minimumRating">Minimum IMDB Rating</Label>
                      <div className="flex gap-2">
                        <p>{value}</p>
                        <Slider
                          max={10}
                          step={1}
                          name="minimumRating"
                          onValueChange={setValue}
                          value={value}
                        />
                      </div>
                    </div>
                    <Button type="submit">Filter</Button>
                  </div>
                </form>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Link href={"/addMovie"}>
            <Button variant={"neutral"}>
              <CirclePlus />
            </Button>
          </Link>
          <Link href={"/myflix/settings"}>
            <Button variant={"neutral"}>
              <Settings />
            </Button>
          </Link>
        </div>
      </div>
      <div className="space-y-8">
        {statusOrder.map((status) => {
          const movies = groupedMovies[status];
          if (movies.length === 0) return null;

          return (
            <div key={status} className="space-y-4">
              <h2 className="text-2xl font-bold">
                {statusLabels[status]} ({movies.length})
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 portrait:w-full h-min">
                {movies.map((item) => (
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
    </div>
  );
}
