// index.ts

// Import all exported symbols from the Dialog module
import * as DialogModule from "./Dialog";

// Re-export all symbols from the Dialog module
// This allows consumers of this module to import symbols directly
// from this module without having to know the implementation details
// of where they actually come from
export { DialogModule };

// Additionally, you can also re-export specific symbols from the Dialog module
// to provide a more convenient syntax for consumers of this module
export { default as Dialog } from "./Dialog";

