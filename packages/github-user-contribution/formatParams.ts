export type Options = { from?: string; to?: string } | { year: number };

export const formatParams = (options: Options = {}) => {
  const sp = new URLSearchParams();

  const o: any = { ...options };

  if ("year" in options) {
    o.from = `${options.year}-01-01`;
    o.to = `${options.year}-12-31`;
  }

  for (const s of ["from", "to"])
    if (o[s]) {
      const value = o[s];

      if (value >= formatDate(new Date()))
        throw new Error(
          "Cannot get contribution for a date in the future.\nPlease limit your range to the current UTC day."
        );

      sp.set(s, value);
    }

  return sp.toString();
};

const formatDate = (d: Date) => {
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth() + 1;
  const date = d.getUTCDate();

  return [
    year,
    month.toString().padStart(2, "0"),
    date.toString().padStart(2, "0"),
  ].join("-");
};
