// data.ts
export * from "./data/dataModule1";
export * from "./data/dataModule2";

// document.ts
export * from "./document/documentModule1";
export * from "./document/documentModule2";

// index.ts
import * as data from "./data";
import * as document from "./document";

// Add type declarations here if using TypeScript
export { data, document };
