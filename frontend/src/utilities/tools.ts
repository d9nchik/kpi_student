// Just look here:👉 https://gamedev.stackexchange.com/questions/110431/how-can-i-calculate-current-level-from-total-xp-when-each-level-requires-propor
const THRESHOLD = 50;

export interface LevelDescribe {
  level: number;
  currentXP: number;
  XPNeeded: number;
}

export function calculateLevel(gameLevel: number): LevelDescribe {
  const level = Math.floor(
    (1 + Math.sqrt(1 + (gameLevel * 8) / THRESHOLD)) / 2
  );

  const previousXPNeeded = calculateXPNeeded(level);
  const XPNeeded = calculateXPNeeded(level + 1) - previousXPNeeded;
  return { level, currentXP: gameLevel - previousXPNeeded, XPNeeded };
}

export function calculateXPNeeded(level: number): number {
  return Math.floor((level * (level - 1) * THRESHOLD) / 2);
}
