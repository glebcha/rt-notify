declare module '@bit/ramda.ramda.find-index' {
  export default function findIndex<T>(fn: (a: T) => boolean, list: readonly T[]): number;
}