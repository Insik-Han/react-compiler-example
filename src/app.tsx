import type { ReactNode } from "react";
import CompiledComponent from "./CompiledComponent";
import UnCompiledComponent from "./UnCompiledComponent";

export default function App(): ReactNode {
  return (
    <div>
      <h1>This is React Compiler Example</h1>
      <CompiledComponent />
      <UnCompiledComponent />
    </div>
  );
}
