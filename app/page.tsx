"use client";

import { useRef } from "react";
import { parse } from "csv-parse/sync";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const contents = event.target?.result as string;
        const records = parse(contents, {
          columns: true,
          cast: true,
          skip_empty_lines: true,
          delimiter: ",",
        });
        console.log(records);
      };
      reader.readAsText(file);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <input
        aria-label="File browser example"
        type="file"
        accept="csv, text/csv, .csv, .txt, text/plain,"
        capture="user"
        style={{ display: "none" }}
        onChange={uploadFile}
        ref={fileInputRef}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Load csv file
      </button>
      <div className="pt-5">hello</div>
    </main>
  );
}
