export const arrayEquals = <T>(a: T[], b: T[]) =>
  a.length === b.length && a.every((_, i) => a[i] === b[i]);
