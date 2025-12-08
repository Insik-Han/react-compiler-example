import { useState, type ReactNode } from "react";

/*
  This component moves optional chaining outside the try-catch block,
  which allows React Compiler to optimize it correctly.
*/

export default function OptimizedOptionalChainingInTryCatch(): ReactNode {
  const [secondInfo, setSecondInfo] = useState<string>("");

  async function fetchData() {
    let data;

    const randomIndex = Math.floor(Math.random() * 2);

    try {
      const res = await fetch("../data.json");
      data = await res.json();
    } catch {
      console.error("Failed to fetch data");
    }

    setSecondInfo(data.list[randomIndex].info?.version ?? "No Version");
  }

  return (
    <div style={{ border: "1px solid black" }}>
      <h3>OptionalChainingInTryCatch</h3>
      <blockquote>
        This component demonstrates optional chaining with try-catch blocks.
        Click the button to fetch data and see how optional chaining handles
        potentially missing properties.
      </blockquote>
      <button type="button" onClick={fetchData}>
        Fetch Data
      </button>
      <p>{secondInfo}</p>
    </div>
  );
}
