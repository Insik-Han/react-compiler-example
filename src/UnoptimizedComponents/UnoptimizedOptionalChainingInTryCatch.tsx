import { useState, type ReactNode } from "react";

/*
  React Compiler may not correctly optimize optional chaining inside try-catch blocks.
  In this example, the optional chaining is inside the try block, which prevents optimization.
*/

export default function UnoptimizedOptionalChainingInTryCatch(): ReactNode {
  const [secondInfo, setSecondInfo] = useState<string>("");

  async function fetchData() {
    try {
      const res = await fetch("../data.json");
      const data = await res.json();

      const randomIndex = Math.floor(Math.random() * 2);

      setSecondInfo(data.list[randomIndex].info?.version ?? "No Version");
    } catch {
      console.error("Failed to fetch data");
    }
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
