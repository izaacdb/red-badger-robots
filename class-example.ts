import { Command, Direction, Grid, Robot } from "./types";
import { sampleInput } from "./data";

class TechnicalTest {
  protected robots: Robot[];
  private grid: Grid;

  constructor(input: string) {
    const data = this.parseData(input);
    this.robots = data.robots;
    this.grid = data.grid;
  }

  parseData(input: string) {
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
    if (isNaN(grid.x) || isNaN(grid.y)) {
      throw new Error("Invalid grid");
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
      if (isNaN(robot.x) || isNaN(robot.y)) {
        throw new Error("Invalid coords");
      }

      return robot;
    });

    return { robots, grid };
  }

  runCommand(command: Command, robot: Robot) {
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

  start() {
    const results: string[] = [];
    const fallenRobots: Robot[] = [];

    this.robots.forEach((r, i) => {
      console.log(`\nRobot ${i + 1} ---`);

      r.commands.some((c, j) => {
        const nextPos = this.runCommand(c, { ...r });

        console.log(
          `Step ${j + 1}`,
          { x: r.x, y: r.y, direction: r.direction },
          c,
        );

        if (this.existsInFallen(fallenRobots, nextPos)) {
          // Skip this step as it killed another robot
          return;
        }

        if (
          nextPos.y > this.grid.y ||
          nextPos.y < 0 ||
          nextPos.x > this.grid.x ||
          nextPos.x < 0
        ) {
          // Out of bounds
          fallenRobots.push(nextPos);
          console.log(
            `Step ${j + 2}`,
            { x: nextPos.x, y: nextPos.y, direction: nextPos.direction },
            "LOST",
          );
          // Finish command loop early - record lost position
          results.push(`${r.x}${r.y}${r.direction}LOST`);
          return true;
        }

        // Update to new position and direction
        r.x = nextPos.x;
        r.y = nextPos.y;
        r.direction = nextPos.direction;

        if (j === r.commands.length - 1) {
          // Final command loop reached - record position
          console.log(`Step ${j + 2}`, {
            x: r.x,
            y: r.y,
            direction: r.direction,
          });
          results.push(`${r.x}${r.y}${r.direction}`);
          return true;
        }
      });
    });

    // { results: [ '11E', '33NLOST', '23S' ] }

    console.log("\nResult:");
    console.log(results.join("\n"));
    return results.join("\n");
  }

  existsInFallen(fallenRobots: Robot[], robot: Robot) {
    return fallenRobots.some(
      (r) =>
        r.x === robot.x && r.y === robot.y && r.direction === robot.direction,
    );
  }
}

class ExtendedTest extends TechnicalTest{
  private newLabel: string;
  constructor(input: string) {
    super(input);
    this.newLabel = `There are ${this.robots.length} robots`
  }
}

const game = new ExtendedTest(sampleInput)
game.start()