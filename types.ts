import { commands, directions } from "./data";

export type Direction = (typeof directions)[number];
export type Command = (typeof commands)[number];

export interface Robot {
  x: number;
  y: number;
  direction: Direction;
  commands: Command[];
}

export interface Grid {
  x: number;
  y: number;
}

export interface Data {
  grid: Grid;
  robots: Robot[];
}
