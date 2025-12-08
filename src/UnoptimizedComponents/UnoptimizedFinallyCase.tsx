import { useState, type ReactNode } from "react";

/*
  React Compiler may not correctly optimize try-catch-finally blocks.
  In this example, the `finally` block sets the random value, but React Compiler's
  optimization can cause it to not execute as intended.
*/

export default function FinallyCase(): ReactNode {
  const [message, setMessage] = useState<string>("");
  const [randomValue, setRandomValue] = useState<number | null>(null);

  async function generateRandom(): Promise<void> {
    const random = Math.random();
    try {
      await new Promise((resolve, reject) =>
        random > 0.5 ? resolve(undefined) : reject(),
      );
      setMessage("try: FinallyCase log");
      return;
    } catch {
      setMessage("catch: FinallyCase log");
      return;
    } finally {
      setRandomValue(random);
    }
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
