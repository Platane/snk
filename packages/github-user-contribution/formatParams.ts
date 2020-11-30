export type Options =
  | { from?: string | Date; to?: string | Date }
  | { year: number };

export const formatParams = (options: Options = {}) => {
  const sp = new URLSearchParams();

  const o: any = { ...options };

  if ("year" in options) {
    const from = new Date();
    from.setFullYear(options.year);
    from.setMonth(0);
    from.setDate(1);

    const to = new Date();
    to.setFullYear(options.year);
    to.setMonth(11);
    to.setDate(31);

    o.from = from;
    o.to = to;
  }

  for (const s of ["from", "to"])
    if (o[s]) {
      const value = formatDate(o[s]);

      if (value >= formatDate(new Date()))
        throw new Error("cannot get contribution for date in the future");

      sp.set(s, value);
    }

  return sp.toString();
};

const formatDate = (input: Date | string) => {
  const d = new Date(input);

  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const date = d.getDate();

  return [
    year,
    month.toString().padStart(2, "0"),
    date.toString().padStart(2, "0"),
  ].join("-");
};
