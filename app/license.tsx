import Image from "next/image";

export default function License() {
  return (
    <div id="license" className="h-40 flex items-center">
      <div className="flex items-center gap-4">
        <Image
          src={"/logo.png"}
          width={64}
          height={64}
          alt="logo"
          className="h-max"
        ></Image>
        <div id="legal">
          Gay Agenda License - 1.0 <br />
          Loremus 2025 <br />
          Be gay, do crimes.
        </div>
      </div>
    </div>
  );
}
