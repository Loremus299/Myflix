"use client";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { searchMovies } from "@/db/server";
import { useRef, useState } from "react";
import { createMovie, readMovies } from "@/db";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export interface searchedData {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export default function Page() {
  const { data } = useQuery({
    queryKey: ["movies"],
    queryFn: () => readMovies(),
    staleTime: Infinity,
  });

  const client = useQueryClient();
  const inp = useRef<HTMLInputElement>(null);
  const [movies, setMovies] = useState<searchedData[] | null>(null);

  const search = async () => {
    const term = inp.current?.value;
    if (term !== "") {
      const data: searchedData[] = await searchMovies(term!);
      if (typeof data == "string") {
        toast.error(data);
      } else {
        setMovies(data);
      }
    }
  };

  const movieGrid = () => {
    if (movies) {
      return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {movies?.map((item) => (
            <Card key={item.imdbID}>
              <CardContent className="flex gap-4 overflow-hidden">
                <Image
                  src={item.Poster != "N/A" ? item.Poster : "/no-image.png"}
                  className="h-18 w-12"
                  alt={item.imdbID + "|" + item.imdbID}
                  width={300}
                  height={300}
                />
                <div>
                  <h1>{item.Title}</h1>
                  <p>{item.Year}</p>
                </div>
                <Button
                  className="aspect-square ml-auto h-17"
                  onClick={() => {
                    const x = data?.filter((thing) => thing.name == item.Title);
                    if (x?.length == 0) {
                      createMovie(item.imdbID);
                      toast.success("Movie added");
                      client.invalidateQueries({ queryKey: ["movies"] });
                    } else {
                      toast.info("Already exists");
                    }
                  }}
                >
                  +
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="p-4">
      <Toaster />
      <div className="flex gap-2 w-full items-center justify-center">
        <Input
          ref={inp}
          placeholder="Search movie, web series to add..."
          className="max-w-md"
          onKeyDown={(e) => {
            if (e.code == "Enter") {
              search();
            }
          }}
        />
        <Button onClick={search}>Search</Button>
      </div>
      {movieGrid()}
      <Link href="/myflix">
        <Button className="fixed bottom-8 right-8">
          <ArrowLeft />
        </Button>
      </Link>
    </div>
  );
}
