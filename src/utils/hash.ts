export const hash = (): string =>
  Math.random()
    .toString(16)
    .slice(2, 10);
