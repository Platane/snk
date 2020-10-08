const epsilon = 0.01;

export const clamp = (a: number, b: number) => (x: number) =>
  Math.max(a, Math.min(b, x));

/**
 * step the spring, mutate the state to reflect the state at t+dt
 *
 */
const stepSpringOne = (
  s: { x: number; v: number },
  {
    tension,
    friction,
    maxVelocity = Infinity,
  }: { tension: number; friction: number; maxVelocity?: number },
  target: number,
  dt = 1 / 60
) => {
  const a = -tension * (s.x - target) - friction * s.v;

  s.v += a * dt;
  s.v = clamp(-maxVelocity / dt, maxVelocity / dt)(s.v);
  s.x += s.v * dt;
};

/**
 * return true if the spring is to be considered in a stable state
 * ( close enough to the target and with a small enough velocity )
 */
export const isStable = (
  s: { x: number; v: number },
  target: number,
  dt = 1 / 60
) => Math.abs(s.x - target) < epsilon && Math.abs(s.v * dt) < epsilon;

export const isStableAndBound = (
  s: { x: number; v: number },
  target: number,
  dt?: number
) => {
  const stable = isStable(s, target, dt);
  if (stable) {
    s.x = target;
    s.v = 0;
  }
  return stable;
};

export const stepSpring = (
  s: { x: number; v: number },
  params: { tension: number; friction: number; maxVelocity?: number },
  target: number,
  dt = 1 / 60
) => {
  const interval = 1 / 60;

  while (dt > 0) {
    stepSpringOne(s, params, target, Math.min(interval, dt));
    // eslint-disable-next-line no-param-reassign
    dt -= interval;
  }
};
