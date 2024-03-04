import { Robot } from "./types";
import { sampleInput } from "./data";
import { existsInScents, parseData, runCommand } from "./lib";

export function main(input: string) {
  const scents: Robot[] = [];
  const { robots, grid } = parseData(input);
  const results: string[] = [];
  robots.forEach((r) => {
    r.commands.some((c, j) => {
      const nextPosition = runCommand(c, { ...r });

      // Strip the commands so that we can compare different robots
      const { commands, ...robot } = r;

      if (existsInScents(scents, nextPosition)) {
        // Skip this step as it killed another robot
        return;
      }

      if (
        nextPosition.y > grid.y ||
        nextPosition.y < 0 ||
        nextPosition.x > grid.x ||
        nextPosition.x < 0
      ) {
        // Out of bounds
        scents.push(nextPosition);
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
  console.log('Input:')
  console.log(input)
  console.log('\nResult:');
  console.log(results.join("\n"))
  return results.join("\n");
}

main(sampleInput);
