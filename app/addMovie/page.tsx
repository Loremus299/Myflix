"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { searchMovies } from "@/db/server";
import { useRef, useState } from "react";
import { createMovie } from "@/db";
import { useQueryClient } from "@tanstack/react-query";
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
  const client = useQueryClient();
  const inp = useRef<HTMLInputElement>(null);
  const [movies, setMovies] = useState<searchedData[] | null>(null);

  const search = async () => {
    const term = inp.current?.value;
    if (term !== "") {
      const data: searchedData[] = await searchMovies(term!);
      if (typeof data == "string") {
        window.alert(data);
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
                  src={item.Poster!="N/A" ? item.Poster : "/no-image.png"}
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
                    createMovie(item.imdbID);
                    window.alert("movie added");
                    client.invalidateQueries({ queryKey: ["movies"] });
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
    <div className="min-h-screen flex flex-wrap landscape:items-center landscape:justify-center w-full p-4">
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
