import { Command, Direction, Grid, Robot } from "./types";

export function parseData(input: string) {
  let split = input.split("\n");
  if (!split || split.length < 2) {
    throw new Error("Parsing problem");
  }

  const gridSize = split.shift()!.split(" ")[0].split("");

  // Gets grid from 0. Is 0-2 a grid size of 3?
  const grid = {
    x: Number(gridSize[0]),
    y: Number(gridSize[1]),
  } as Grid;
  if(isNaN(grid.x) || isNaN(grid.y)){
    throw new Error('Invalid grid')
  }

  const robotData = split.map((d) => d.split(" ").map((s) => s.split("")));

  // Gets some simple to understand robots. Assuming input data is all correct.
  const robots = robotData.map((r) => {
    const robot = {
      x: Number(r[0][0]),
      y: Number(r[0][1]),
      direction: r[0][2] as Direction,
      commands: r[1] as Command[],
    } as Robot;
    if(isNaN(robot.x) || isNaN(robot.y)){
      throw new Error('Invalid coords')
    }

    return robot
  });

  return { robots, grid };
}

export function runCommand(command: Command, robot: Robot) {
  switch (command) {
    case "F":
      // Move forwards
      switch (robot.direction) {
        case "N":
          robot.y += 1;
          break;
        case "E":
          robot.x += 1;
          break;
        case "S":
          robot.y -= 1;
          break;
        case "W":
          robot.x -= 1;
          break;
        default:
          throw new Error("Unhandled direction case");
      }
      break;
    case "L":
      // Turn left
      switch (robot.direction) {
        case "N":
          robot.direction = "W";
          break;
        case "W":
          robot.direction = "S";
          break;
        case "S":
          robot.direction = "E";
          break;
        case "E":
          robot.direction = "N";
          break;
        default:
          throw new Error("Unhandled direction case");
      }
      break;
    // Turn right
    case "R":
      switch (robot.direction) {
        case "N":
          robot.direction = "E";
          break;
        case "E":
          robot.direction = "S";
          break;
        case "S":
          robot.direction = "W";
          break;
        case "W":
          robot.direction = "N";
          break;
        default:
          throw new Error("Unhandled direction case");
      }
      break;
    default:
      throw new Error("Unhandled command case");
  }

  return robot;
}

export function existsInScents(scents: Robot[], robot: Robot) {
  return scents.some(
    (r) =>
      r.x === robot.x && r.y === robot.y && r.direction === robot.direction,
  );
}
