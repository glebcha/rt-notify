export const hash = () =>
  Math.random()
    .toString(16)
    .slice(2, 10)
