import { useState } from "react";

export default function UnCompiledComponent() {
  const [message, setMessage] = useState("");
  const [randomValue, setRandomValue] = useState(null);

  async function showConsoleLog() {
    let random = Math.random();
    try {
      await new Promise((resolve, reject) =>
        random > 0.5 ? resolve() : reject(),
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
