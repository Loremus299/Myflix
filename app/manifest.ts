import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Myflix",
    short_name: "Myflix",
    description: "A privacy focused movie tracker",
    start_url: "/myflix",
    display: "fullscreen",
    orientation: "portrait",
    background_color: "#ffe0e0",
    theme_color: "#ff4d4f",
    icons: [
      {
        src: "/logo.png",
        sizes: "475x475",
        type: "image/png",
      },
    ],
  };
}
