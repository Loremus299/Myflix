import { Movie } from "@/db";

export function filterFunction(form: HTMLFormElement, data: Movie[]) {
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

  return copyofData;
}

export function sort(order: string, data: Movie[]) {
  switch (order) {
    case "yor":
      return data.sort((a, b) => {
        if (a.year > b.year) {
          return -1;
        }
        if (a.year < b.year) {
          return 1;
        } else {
          return 0;
        }
      });
    case "alphabetical":
      return data.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        } else {
          return 0;
        }
      });
    case "rating":
      return data.sort((a, b) => {
        if (a.imdbRating > b.imdbRating) {
          return -1;
        }
        if (a.imdbRating < b.imdbRating) {
          return 1;
        } else {
          return 0;
        }
      });
    default:
      return data;
  }
}
