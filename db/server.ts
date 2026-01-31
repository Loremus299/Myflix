"use server";
import axios from "axios";

export async function FetchMovie(id: string) {
  const APIKEY = process.env.APIKEY;
  const res = await axios.get(
    `http://www.omdbapi.com/?i=${id}&apikey=${APIKEY}`
  );
  return res.data;
}

export async function searchMovies(name: string) {
  const APIKEY = process.env.APIKEY;
  const res = await axios.get(
    `http://www.omdbapi.com/?s=${encodeURIComponent(name)}&apikey=${APIKEY}`
  );
  if (res.data.Response !== "False") {
    return res.data.Search;
  } else {
    return res.data.Error;
  }
}
