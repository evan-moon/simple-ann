export function getTargets (nodePerLayer: number): number[] {
  const targets: number[] = [];
  const min = 0.1;
  const max = 1;
  for (let i = 0; i < nodePerLayer; i++) {
    targets.push(Math.random() * (max - min) + min);
  }
  return targets;
}