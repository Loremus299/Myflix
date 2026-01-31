"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Movie } from "@/db";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { filterFunction } from "./script";
import { useEffect, useState } from "react";
import MovieDisplay from "./movieDisplay";
import Link from "next/link";
import { Plus, Settings } from "lucide-react";

export default function Filter(props: { data: Movie[] }) {
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    setDataRef(props.data);
  }, [props.data]);
  const directorsData = props.data.map((item) => item.director);
  const s = new Set(directorsData);
  const directors = [...s];

  const genresData = props.data.map((item) => item.genre);
  const x = genresData.flatMap((item) => item);
  const genresmid = x.map((item) => item.trim());
  const S = new Set(genresmid);
  const genres = [...S];

  const countriesData = props.data.map((item) => item.country);
  const y = countriesData.flatMap((item) => item);
  const countriesmid = y.map((item) => item.trim());
  const V = new Set(countriesmid);
  const countries = [...V];

  const [dataRef, setDataRef] = useState<Movie[]>(props.data);
  const [value, setValue] = useState<number[]>([0]);

  const clearFilters = () => {
    setDataRef(props.data);
    setValue([0]);
  };

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-full">Filter</Button>
          </AlertDialogTrigger>
          {dataRef && dataRef.length !== props.data.length && (
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
                  setDataRef(filterFunction(e.currentTarget, props.data));
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
            <Plus />
          </Button>
        </Link>
        <Link href={"/myflix/settings"}>
          <Button variant={"neutral"}>
            <Settings />
          </Button>
        </Link>
      </div>
      <MovieDisplay data={dataRef}></MovieDisplay>
    </div>
  );
}
