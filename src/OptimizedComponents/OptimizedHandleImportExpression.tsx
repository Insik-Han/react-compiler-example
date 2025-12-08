import { useState, type ReactNode } from "react";

/*
  React Compiler cannot optimize dynamic import expressions inside a React component.
  To enable optimization, extract the dynamic import into a separate function outside the component.
*/

export default function OptimizedHandleImportExpression(): ReactNode {
  const [count, setCount] = useState<number>(2);

  async function handleIncrement(): Promise<void> {
    const { double } = await calculator();
    const result = double(count);
    setCount(result);
  }

  return (
    <div style={{ border: "1px solid black" }}>
      <h3>ImportExpressionInComponent</h3>
      <blockquote>
        This component demonstrates dynamic import expressions within a React
        component. Click the button to increment the count using a dynamically
        imported function.
      </blockquote>
      <button onClick={handleIncrement}>Increment</button>
      <p>Count: {count}</p>
    </div>
  );
}

async function calculator(): Promise<{ double: (num: number) => number }> {
  return await import("../calc");
}
