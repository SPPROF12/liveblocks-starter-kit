// re-exporting.ts

// Only re-export what is necessary
export * as Tooltip from "./Tooltip";

// Add a default export for convenience
const { default: TooltipDefault } = await import("./Tooltip");
export { TooltipDefault as Tooltip };

// Add a types file for better TypeScript support
export * as TooltipTypes from "./Tooltip/types";

// Add documentation for better understanding of the module
/**
 * This module re-exports the Tooltip component and its types.
 * It also provides a default export for the Tooltip component.
 */
