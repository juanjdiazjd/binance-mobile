export const mountToSatoshi = (mount: number): string =>
  (mount / 100000000).toFixed(8);
