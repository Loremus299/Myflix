"use client";

import { readMovies } from "@/db";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Filter from "./filter";

export default function Pageclient() {
  const client = useQueryClient();
  const { status, data } = useQuery({
    queryKey: ["movies"],
    queryFn: () => readMovies(),
    staleTime: Infinity,
  });

  useEffect(() => {
    client.refetchQueries({ queryKey: ["movies"] });
  }, [status, data, client]);

  if (status == "error") {
    return <div>Error</div>;
  }
  if (status == "pending") {
    return <div>Loading</div>;
  }

  return (
    <div>
      <Filter data={data} />
    </div>
  );
}
