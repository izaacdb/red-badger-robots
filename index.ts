const sampleInput = `53
11E RFRFRFRF
32N FRRFLLFFRRFLL
03W LLFFFLFLFL`;

const sampleOutput = `
11E
33NLOST
23S
`;

const directions = ["N", "E", "S", "W"] as const;
const commands = ["L", "R", "F"] as const;
type Direction = (typeof directions)[number];
type Command = (typeof commands)[number];

interface Robot {
  x: number;
  y: number;
  direction: Direction;
  commands: Command[];
}

interface Grid {
  x: number;
  y: number;
}

function existsInGraveyard(graveyard: Partial<Robot>[], robot: Partial<Robot>) {
  return graveyard.some(
    (r) =>
      r.x === robot.x && r.y === robot.y && r.direction === robot.direction,
  );
}

function parseData(input: string) {
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

  const robotData = split.map((d) => d.split(" ").map((s) => s.split("")));

  // Gets some simple to understand robots. Assuming input data is all correct.
  const robots = robotData.map((r) => {
    return {
      x: Number(r[0][0]),
      y: Number(r[0][1]),
      direction: r[0][2] as Direction,
      commands: r[1] as Command[],
    } as Robot;
  });

  /**
   * Robot 1 =
   * {
   *       "x": 1,
   *       "y": 1,
   *       "facing": "E",
   *       "commands": [
   *         "R",
   *         "F",
   *         "R",
   *         "F",
   *         "R",
   *         "F",
   *         "R",
   *         "F"
   *       ]
   *     }
   */
  return { robots, grid };
}

function runCommand(command: Command, robot: Robot) {
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

function main() {
  const graveyard: Partial<Robot>[] = [];
  const { robots, grid } = parseData(sampleInput);
  const results: string[] = [];
  robots.forEach((r) => {
    r.commands.some((c, j) => {

      const nextPosition = runCommand(c, {...r});

      // Strip the commands so that we can compare different robots
      const { commands, ...robot } = r;

      if (existsInGraveyard(graveyard, nextPosition)) {
        // Skip this step as it killed another robot
        return;
      }

      if (
        nextPosition.y > grid.y ||
        nextPosition.y < 0 ||
        nextPosition.x > grid.x ||
        nextPosition.x < 0
      ) {

        // Out of bounds, pushing where it was before it fell off
        graveyard.push(nextPosition);
        // Finish command loop
        results.push(`${robot.x}${robot.y}${robot.direction}LOST`);
        return true;
      }

      // Update to new position and direction
      r.x = nextPosition.x;
      r.y = nextPosition.y;
      r.direction = nextPosition.direction;

      if (j === commands.length - 1) {
        // Finish command loop
        results.push(`${r.x}${r.y}${r.direction}`);
        return true;
      }
    });
  });

  // { results: [ '11E', '33NLOST', '23S' ] }
  console.log(results.join('\n'));
}

main();
