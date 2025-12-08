import { useState, type ReactNode } from "react";

/*
  This component avoids using a `finally` block, which allows React Compiler
  to optimize it correctly. The state update is placed directly after the
  try-catch block instead of inside a `finally` block.
*/

export default function OptimizedFinallyCase(): ReactNode {
  const [message, setMessage] = useState<string>("");
  const [randomValue, setRandomValue] = useState<number | null>(null);

  async function generateRandom(): Promise<void> {
    const random = Math.random();
    try {
      await new Promise((resolve, reject) =>
        random > 0.5 ? resolve(undefined) : reject(),
      );
      setMessage("try: OptimizedFinallyCase log");
    } catch {
      setMessage("catch: OptimizedFinallyCase log");
    }

    setRandomValue(random);
  }

  return (
    <div style={{ border: "1px solid black" }}>
      <h3>FinallyCase</h3>
      <blockquote>
        This component demonstrates the behavior of the `finally` block when
        using React Compiler. Click the button to generate a random number and
        see how the `finally` block affects the state update.
      </blockquote>
      <button onClick={generateRandom}>Generate Random</button>
      <p>{message}</p>
      <p>{randomValue}</p>
    </div>
  );
}
