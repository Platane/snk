export const sortPush = <T>(arr: T[], x: T, sortFn: (a: T, b: T) => number) => {
  let a = 0;
  let b = arr.length;

  if (arr.length === 0 || sortFn(x, arr[a]) <= 0) {
    arr.unshift(x);
    return;
  }

  while (b - a > 1) {
    const e = Math.ceil((a + b) / 2);

    const s = sortFn(x, arr[e]);

    if (s === 0) a = b = e;
    else if (s > 0) a = e;
    else b = e;
  }

  const e = Math.ceil((a + b) / 2);
  arr.splice(e, 0, x);
};
