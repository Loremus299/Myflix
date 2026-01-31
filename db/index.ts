import { Dexie, Table } from "dexie";
import { FetchMovie } from "./server";

export type MovieStatus = "pending" | "watched" | "watching";

export interface Movie {
  id?: number;
  poster: string;
  name: string;
  plot: string;
  year: number;
  country: string[];
  genre: string[];
  director: string;
  imdbRating: number;
  personalRating: number;
  status: MovieStatus;
}

const db = new Dexie("Myflix");
db.version(1).stores({
  movie:
    "++id, poster, name, plot, year, genre, director, imdbRating, personalRating, status",
});

const movietable: Table<Movie> = db.table("movie");

export async function deleteData() {
  return await db.delete({ disableAutoOpen: false });
}

export async function allData() {
  return await movietable.toArray();
}

export async function importData(arg: Movie[]) {
  await db.delete({ disableAutoOpen: false });
  await movietable.bulkPut(arg);
}

export async function createMovie(id: string) {
  const data = await FetchMovie(id);
  if (data.Response !== "False") {
    movietable.add({
      poster: data.Poster.replace("SX300", "SX5000"),
      name: data.Title,
      plot: data.Plot,
      year: parseInt(data.Year),
      country: data.Country.split(","),
      genre: data.Genre.split(","),
      director: data.Director,
      imdbRating: parseFloat(data.imdbRating),
      personalRating: 0,
      status: "pending",
    });
  }
}

export async function readMovie(id: number) {
  return movietable.where("id").equals(id).first();
}

export async function readMovies() {
  return movietable.toArray();
}

export async function updateStatus(id: number, status: MovieStatus) {
  movietable.where("id").equals(id).modify({ status: status });
}

export async function updatePersonalRating(id: number, personalRating: number) {
  movietable.where("id").equals(id).modify({ personalRating: personalRating });
}

export async function deleteMovie(id: number) {
  movietable.where("id").equals(id).delete();
}

export async function setOrder(val: string) {
  localStorage.setItem("order", val);
}

export async function getOrder() {
  const val = localStorage.getItem("order");
  if (val) {
    return val;
  } else {
    setOrder("library");
    return "library";
  }
}
