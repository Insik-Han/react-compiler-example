import { transformFromAstSync } from "@babel/core";
import BabelParser from "@babel/parser";
import fs from "fs";
import BabelPluginReactCompiler from "babel-plugin-react-compiler";

function runBabelPluginReactCompiler(
  BabelPluginReactCompiler,
  text,
  file,
  language,
) {
  const successfulCompilations = [];
  const failedCompilations = [];

  const logger = {
    logEvent(filename, rawEvent) {
      const event = { ...rawEvent, filename };
      switch (event.kind) {
        case "CompileSuccess": {
          successfulCompilations.push(event);
          return;
        }
        case "CompileError":
        case "CompileDiagnostic":
        case "PipelineError":
          failedCompilations.push(event);
          return;
      }
    },
  };

  const COMPILER_OPTIONS = {
    compilationMode: "infer",
    environment: { enableTreatRefLikeIdentifiersAsRefs: true },
    logger,
    noEmit: true,
    panicThreshold: "none",
  };

  const ast = BabelParser.parse(text, {
    sourceFilename: file,
    plugins: [language, "jsx"],
    sourceType: "module",
  });
  const result = transformFromAstSync(ast, text, {
    filename: file,
    highlightCode: false,
    retainLines: true,
    plugins: [[BabelPluginReactCompiler, COMPILER_OPTIONS]],
    sourceType: "module",
    configFile: false,
    babelrc: false,
  });

  if (result?.code == null) {
    throw new Error(
      `Expected BabelPluginReactForget to codegen successfully, got: ${result}`,
    );
  }

  return { successfulCompilations, failedCompilations };
}

function checkReactCompiler(sourceCode, filename) {
  try {
    return runBabelPluginReactCompiler(
      BabelPluginReactCompiler,
      sourceCode,
      filename,
      "typescript",
    );
  } catch (error) {
    console.error("Failed to compile:", error);
    return { successfulCompilations: [], failedCompilations: [] };
  }
}

const filePath = process.argv[2];

if (!filePath) {
  console.error("Usage: node check-react-compiler.js <file-path>");
  process.exit(1);
}

try {
  const sourceCode = fs.readFileSync(filePath, "utf-8");
  const result = checkReactCompiler(sourceCode, filePath);

  const totalComponents =
    result.successfulCompilations.length + result.failedCompilations.length;

  console.log("\n=== React Compiler Check Results ===");
  console.log(`File: ${filePath}`);
  console.log(`Total components: ${totalComponents}\n`);

  if (result.successfulCompilations.length > 0) {
    console.log(
      `✅ Successfully compiled: ${result.successfulCompilations.length} component(s)`,
    );
    result.successfulCompilations.forEach((compilation, index) => {
      console.log(
        `  ${index + 1}. ${compilation.fnLoc ? `at ${JSON.stringify(compilation.fnLoc)}` : "Component"}`,
      );
    });
  } else {
    console.log("⚠️  No successful compilations");
  }

  if (result.failedCompilations.length > 0) {
    console.log(
      `\n❌ Failed to compile: ${result.failedCompilations.length} component(s)`,
    );
    result.failedCompilations.forEach((compilation, index) => {
      console.log(`  ${index + 1}. Kind: ${compilation.kind}`);
      if (compilation.fnLoc) {
        console.log(`     Location: ${JSON.stringify(compilation.fnLoc)}`);
      }
      if (compilation.detail) {
        console.log(`     Detail: ${compilation.detail}`);
      }
      if (compilation.reason) {
        console.log(`     Reason: ${compilation.reason}`);
      }
    });
    process.exit(1);
  } else {
    console.log("\n🎉 All components compiled successfully!");
  }
} catch (error) {
  console.error(`\n❌ Error reading file ${filePath}:`, error.message);
  process.exit(1);
}
