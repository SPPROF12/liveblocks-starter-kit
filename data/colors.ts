/**
 * An array of color strings used throughout the app.
 */
export const appColors = [
  "#0077ff",
  "#00bbff",
  "#00cc88",
  "#88cc11",
  "#ffbb00",
  "#ff8811",
  "#ee1144",
  "#ee44bb",
  "#8855bf",
] as const;

// TypeScript type for readonly arrays
type ReadonlyArray<T> = readonly T[];

// TypeScript type for the specific colors used in the app
export type AppColor = ReadonlyArray<(typeof appColors)[number]>;
