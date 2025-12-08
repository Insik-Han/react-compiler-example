import { useState, type ReactNode } from "react";

/*
  Dynamic import expressions inside a React component prevent React Compiler from optimizing it.
  This component remains unoptimized because the import() call is within handleIncrement().
*/

export default function UnoptimizedHandleImportExpression(): ReactNode {
  const [count, setCount] = useState<number>(2);

  async function handleIncrement(): Promise<void> {
    const { double } = await import("../calc");
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
