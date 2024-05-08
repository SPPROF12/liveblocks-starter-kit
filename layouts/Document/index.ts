// index.ts

// Import all exported symbols from the Document module
import * as Document from "./Document";

// Re-export all symbols from the Document module
// This allows consumers of this module to import symbols directly from this module
// without having to know the specific path to the Document module
export {
  // Re-export all named exports from the Document module
  Document,
  // Add any other named exports here, if necessary

  // Re-export the default export from the Document module as the default export
  // of this module
  default as default,
} from "./Document";

