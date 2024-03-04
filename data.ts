
export const sampleInput = `53
11E RFRFRFRF
32N FRRFLLFFRRFLL
03W LLFFFLFLFL`;

export const sampleOutput = `11E
33NLOST
23S`;

// Should be able to add in new directions and commands with this
// E.g. N.W. or 'F' for flip
export const directions = ["N", "E", "S", "W"] as const;
export const commands = ["L", "R", "F"] as const;
