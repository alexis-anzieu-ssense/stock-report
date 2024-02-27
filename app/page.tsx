"use client";

import { useRef, useState } from "react";
import { parse } from "csv-parse/sync";
import _ from "lodash";

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [report, setReport] = useState({} as any);

  const columnToCheck = [
    "COMPLETE STATE",
    "CAPTURE LOT CODE",
    "MEASUREMENT REQUIRED",
    "PERISHABLE",
    "HAZARD CLASS",
    "SECURITY CLASS",
  ];

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

        const obj: any = {};

        obj["length"] = records.length;

        columnToCheck.map((column) => {
          obj[column] = _.countBy(records, column);
        });

        setReport(obj);
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
      <pre className="pt-5">{JSON.stringify(report, null, 2)}</pre>
    </main>
  );
}
