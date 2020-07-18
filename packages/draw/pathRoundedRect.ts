export const pathRoundedRect = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  borderRadius: number
) => {
  ctx.moveTo(borderRadius, 0);
  ctx.arcTo(width, 0, width, height, borderRadius);
  ctx.arcTo(width, height, 0, height, borderRadius);
  ctx.arcTo(0, height, 0, 0, borderRadius);
  ctx.arcTo(0, 0, width, 0, borderRadius);
};
