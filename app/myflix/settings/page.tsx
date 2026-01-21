"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUp, FileDown, Trash, ArrowLeft } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { deleteData, allData, importData } from "@/db";
import type { Movie } from "@/db";
import Link from "next/link";

export default function Page() {
  const client = useQueryClient();
  return (
    <div className="grid place-items-center p-4 bg-main min-h-screen">
      <Card className="max-w-240 w-full p-4">
        <h1 className="text-2xl">Settings</h1>
        <div className="border w-full"></div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <p className="pl-1">Import Data</p>
            <Button
              className="ml-auto"
              onClick={async () => {
                const input = document.createElement("input");
                input.type = "file";
                input.click();
                input.addEventListener("change", (event) => {
                  //@ts-expect-error "typescript, just shut up"
                  const file = event.target.files[0];
                  const reader = new FileReader();

                  reader.onload = async function (e) {
                    const content = e.target?.result?.toString();
                    if (content !== undefined) {
                      const json: Movie[] = JSON.parse(content);
                      await importData(json);
                    }
                  };

                  reader.readAsText(file);
                  client.invalidateQueries();
                });
              }}
            >
              <FileDown />
            </Button>
          </div>
          <div className="flex items-center">
            <p className="pl-1">Export Data</p>
            <Button
              className="ml-auto"
              onClick={async () => {
                const blob = new Blob(
                  [JSON.stringify(await allData(), null, 2)],
                  {
                    type: "application/json",
                  },
                );
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "data.json";
                link.click();
                URL.revokeObjectURL(link.href);
              }}
            >
              <FileUp />
            </Button>
          </div>
          <div className="flex items-center">
            <p className="pl-1">Delete All Data</p>
            <Button
              className="ml-auto"
              onClick={async () => {
                await deleteData();
                client.invalidateQueries({ queryKey: ["movies"] });
              }}
            >
              <Trash />
            </Button>
          </div>
        </div>
      </Card>
      <Link href="/myflix" className="fixed bottom-8 right-8">
        <Button>
          <ArrowLeft />
        </Button>
      </Link>
    </div>
  );
}
