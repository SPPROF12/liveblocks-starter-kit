export * from './capitalize';
export * from './getContrastingColor';
export * from './getInitials';
export * from './useBoundingClientRectRef';
export * from './normalizeTrailingSlash';

// can be rewritten as

const moduleNames = [
  './capitalize',
  './getContrastingColor',
  './getInitials',
  './useBoundingClientRectRef',
  './normalizeTrailingSlash'
];

moduleNames.forEach(moduleName => {
  export * from moduleName;
});
