import { type ReactNode } from "react";
import OptimizedFinallyCase from "./OptimizedComponents/OptimizedFinallyCase";
import UnoptimizedFinallyCase from "./UnoptimizedComponents/UnoptimizedFinallyCase";
import UnoptimizedHandleImportExpression from "./UnoptimizedComponents/UnoptimizedHandleImportExpression";
import OptimizedHandleImportExpression from "./OptimizedComponents/OptimizedHandleImportExpression";
import OptimizedOptionalChainingInTryCatch from "./OptimizedComponents/OptimizedOptionalChainingInTryCatch";
import UnoptimizedOptionalChainingInTryCatch from "./UnoptimizedComponents/UnoptimizedOptionalChainingInTryCatch";

export default function App(): ReactNode {
  return (
    <div>
      <h1>This is React Compiler Example</h1>

      <hr />

      <h2>Optimized Components</h2>

      <OptimizedFinallyCase />
      <OptimizedHandleImportExpression />
      <OptimizedOptionalChainingInTryCatch />

      <h2>Unoptimized Components</h2>

      <UnoptimizedFinallyCase />
      <UnoptimizedHandleImportExpression />
      <UnoptimizedOptionalChainingInTryCatch />
    </div>
  );
}
