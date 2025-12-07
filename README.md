# React Compiler Example

A minimal example project demonstrating the [React Compiler](https://react.dev/learn/react-compiler) (formerly React Forget) integrated with Vite and React 19.

## 📖 Overview

This project showcases how to set up and use the React Compiler, an experimental optimization tool that automatically memoizes React components and hooks. The React Compiler reduces the need for manual memoization with `useMemo`, `useCallback`, and `memo`, making your code simpler while maintaining optimal performance.

### What Makes This Example Special?

This project includes two comparison components that demonstrate the React Compiler's behavior:

- **`CompiledComponent`**: A component that follows React Compiler rules and gets successfully optimized
- **`UnCompiledComponent`**: A component that uses `return` statements in try/catch/finally blocks, which prevents compilation

Both components have identical functionality (async button click with random number generation), but their different code patterns show what the React Compiler can and cannot optimize.

## ✨ Features

- ⚡ **React 19** with latest features
- 🔧 **React Compiler** integration via Babel plugin
- 🚀 **Vite** for fast development and building
- 📘 **TypeScript** for type safety
- 🎨 **ESLint + Prettier** for code quality
- 📊 **Compiler Check Script** to verify component compilation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/Insik-Han/react-compiler-example.git
cd react-compiler-example

# Install dependencies
bun install
# or npm install / yarn / pnpm install
```

### Development

```bash
# Start the development server
bun run dev
```

Visit `http://localhost:5173` to see your app.

### Build

```bash
# Build for production (includes TypeScript compilation)
bun run build

# Preview the production build
bun run preview
```

## 🛠️ Key Configuration

### React Compiler Setup

The React Compiler is configured in `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  build: {
    minify: false, // Disabled for easier inspection of compiled output
  },
});
```

### Checking Component Compilation

Use the included script to verify that your components are being compiled by the React Compiler:

```bash
bun run check:react-compiler
```

This script analyzes your components and reports:

- ✅ Successfully compiled components
- ❌ Components that failed compilation (with detailed error messages)
- 📊 Compilation statistics

## 📁 Project Structure

```
react-compiler-example/
├── src/
│   ├── app.tsx                  # Main App component
│   ├── main.tsx                 # Application entry point
│   ├── CompiledComponent.tsx    # ✅ Example of compiler-optimized code
│   └── UnCompiledComponent.tsx  # ❌ Example of non-compilable code
├── scripts/
│   └── check-react-compiler.js  # Compiler verification script
├── public/                      # Static assets
├── vite.config.ts               # Vite configuration with React Compiler
├── eslint.config.js             # ESLint configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies and scripts
```

## 🔍 Understanding the Examples

### CompiledComponent (✅ Can be optimized)

This component uses a clean async/await pattern:

```tsx
async function showConsoleLog() {
  let random = Math.random();
  try {
    await new Promise((resolve, reject) =>
      random > 0.5 ? resolve() : reject(),
    );
    setMessage("try: UnCompiledComponent log");
  } catch {
    setMessage("catch: UnCompiledComponent log");
  }

  setRandomValue(random);
}
```

The React Compiler can optimize this because it follows a straightforward control flow pattern.

### UnCompiledComponent (❌ Cannot be optimized)

This component uses a `finally` block:

```tsx
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
    setRandomValue(random); // ⚠️ finally block prevents compilation
  }
}
```

**Why this fails to compile:**

The React Compiler [does not yet support `finally` blocks](https://github.com/facebook/react/blob/41745339cd258065e47a692bb29d925561b70f08/compiler/packages/babel-plugin-react-compiler/src/HIR/BuildHIR.ts#L1327). This is a known limitation marked as `TODO` in the compiler's source code.

The `return` statements in try/catch blocks are used here to demonstrate a realistic use case where `finally` is actually needed — without the early returns, you could simply place the code after the try-catch block instead of using `finally`.

## 📚 Learn More

- [React Compiler Documentation](https://react.dev/learn/react-compiler)
- [React 19 Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📝 License

This project is open source and available under the MIT License.
