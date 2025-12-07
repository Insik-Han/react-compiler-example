import { useState, type ReactNode } from "react";

export default function UnCompiledComponent(): ReactNode {
  const [message, setMessage] = useState<string>("");
  const [randomValue, setRandomValue] = useState<number | null>(null);

  async function showConsoleLog(): Promise<void> {
    const random = Math.random();
    try {
      await new Promise((resolve, reject) =>
        random > 0.5 ? resolve(undefined) : reject(),
      );
      setMessage("try: UnCompiledComponent log");
      return;
    } catch {
      setMessage("catch: UnCompiledComponent log");
      return;
    } finally {
      setRandomValue(random);
    }
  }

  return (
    <div>
      <h2>This component is not compiled by React Compiler</h2>
      <blockquote>
        When you click the button, a random number is generated and the message
        is set based on whether the number is greater than 0.5.
      </blockquote>
      <button onClick={showConsoleLog}>Show Console Log</button>
      <p>{message}</p>
      <p>{randomValue}</p>
    </div>
  );
}
