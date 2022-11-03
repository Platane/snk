const percent = (x: number) =>
  parseFloat((x * 100).toFixed(2)).toString() + "%";

const mergeKeyFrames = (keyframes: { t: number; style: string }[]) => {
  const s = new Map<string, number[]>();
  for (const { t, style } of keyframes) {
    s.set(style, [...(s.get(style) ?? []), t]);
  }
  return Array.from(s.entries())
    .map(([style, ts]) => ({ style, ts }))
    .sort((a, b) => a.ts[0] - b.ts[0]);
};

/**
 * generate the keyframe animation from a list of keyframe
 */
export const createAnimation = (
  name: string,
  keyframes: { t: number; style: string }[]
) =>
  `@keyframes ${name}{` +
  mergeKeyFrames(keyframes)
    .map(({ style, ts }) => ts.map(percent).join(",") + `{${style}}`)
    .join("") +
  "}";

/**
 * remove white spaces
 */
export const minifyCss = (css: string) =>
  css
    .replace(/\s+/g, " ")
    .replace(/.\s+[,;:{}()]/g, (a) => a.replace(/\s+/g, ""))
    .replace(/[,;:{}()]\s+./g, (a) => a.replace(/\s+/g, ""))
    .replace(/.\s+[,;:{}()]/g, (a) => a.replace(/\s+/g, ""))
    .replace(/[,;:{}()]\s+./g, (a) => a.replace(/\s+/g, ""))
    .replace(/\;\s*\}/g, "}")
    .trim();
