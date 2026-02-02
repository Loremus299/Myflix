"use client";
import { deleteData, allData, importData, setOrder } from "@/db";
import type { Movie } from "@/db";
import { FileUp, FileDown, Trash } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "lucide-react";
import { useRef } from "react";

export default function Options() {
  const client = useQueryClient();
  const button = useRef<HTMLButtonElement>(null);
  return (
    <div>
      <h1 className="text-2xl">Settings</h1>
      <div className="border w-full mt-2 mb-2"></div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <p className="pl-1">Layout</p>
          <form
            className="ml-auto flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              setOrder(data.get("order") as string);
              client.invalidateQueries({ queryKey: ["order"] });
            }}
          >
            <Select
              name="order"
              onValueChange={() => {
                if (button) {
                  button.current?.classList.remove("hidden");
                }
              }}
            >
              <SelectTrigger className="w-50 ml-auto">
                <SelectValue placeholder="Select layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="yor">Year of Release</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  <SelectItem value="library">
                    Added to library order
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              className="hidden"
              ref={button}
              type="submit"
              onClick={(e) => e.currentTarget.classList.add("hidden")}
            >
              <Check />
            </Button>
          </form>
        </div>
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
    </div>
  );
}
