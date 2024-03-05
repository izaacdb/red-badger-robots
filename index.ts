import { Data, Robot } from "./types";
import { sampleInput } from "./data";
import { existsInFallen, parseData, runCommand } from "./lib";

export function run({ robots, grid }: Data) {
  const results: string[] = [];
  const fallenRobots: Robot[] = [];

  robots.forEach((r, i) => {
    console.log(`\nRobot ${i + 1} ---`);

    r.commands.some((c, j) => {
      const nextPos = runCommand(c, { ...r });

      console.log(
        `Step ${j + 1}`,
        { x: r.x, y: r.y, direction: r.direction },
        c,
      );

      if (existsInFallen(fallenRobots, nextPos)) {
        // Skip this step as it killed another robot
        return;
      }

      if (
        nextPos.y > grid.y ||
        nextPos.y < 0 ||
        nextPos.x > grid.x ||
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

export function main(input: string) {
  console.log("Input:", input);
  const data = parseData(input);
  console.log("\nData:", data);
  return run(data);
}

main(sampleInput);
