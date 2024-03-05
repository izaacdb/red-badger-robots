import { existsInFallen, parseData, runCommand } from "../lib";
import { Command, Direction, Robot } from "../types";
import { invalidCoords, invalidGrid } from "./index.test";

const smallInput = `53
11E RFRFRFRF`;

describe("parseData", () => {
  test("throws error on invalid input", () => {
    expect(() => parseData("")).toThrow("Parsing problem");
  });

  test("throws error on invalid grid size", () => {
    expect(() => parseData(invalidGrid)).toThrow("Invalid grid");
  });

  test("throws error on invalid robot coordinates", () => {
    expect(() => parseData(invalidCoords)).toThrow("Invalid coords");
  });

  test("correctly parses input", () => {
    const result = parseData(smallInput);
    expect(result.grid).toEqual({ x: 5, y: 3 });
    expect(result.robots.length).toBe(1);
    expect(result.robots[0]).toEqual({
      x: 1,
      y: 1,
      direction: "E",
      commands: ["R", "F", "R", "F", "R", "F", "R", "F"],
    });
  });
});

describe("runCommand", () => {
  let robot: Robot;

  beforeEach(() => {
    robot = { x: 1, y: 1, direction: "E", commands: [] };
  });

  test("F command moves robot forward", () => {
    const command: Command = "F";
    const expected = { ...robot, x: 2 };
    expect(runCommand(command, robot)).toEqual(expected);
  });

  test("R command turns robot right", () => {
    const command: Command = "R";
    const expected = { ...robot, direction: "S" };
    expect(runCommand(command, robot)).toEqual(expected);
  });

  test("L command turns robot left", () => {
    const command: Command = "L";
    const expected = { ...robot, direction: "N" };
    expect(runCommand(command, robot)).toEqual(expected);
  });

  test("throws error on unhandled direction", () => {
    robot.direction = "Q" as Direction; // Force an invalid direction
    expect(() => runCommand("F", robot)).toThrow("Unhandled direction case");
  });

  test("throws error on unhandled command", () => {
    expect(() => runCommand("Q" as Command, robot)).toThrow(
      "Unhandled command case",
    );
  });
});

describe("existsInScents", () => {
  const scents: Robot[] = [
    { x: 1, y: 1, direction: "N", commands: [] },
    { x: 2, y: 2, direction: "E", commands: [] },
  ];

  test("returns true if robot exists in scents", () => {
    const robot: Robot = { x: 1, y: 1, direction: "N", commands: [] };
    expect(existsInFallen(scents, robot)).toBeTruthy();
  });

  test("returns false if robot does not exist in scents", () => {
    const robot: Robot = { x: 3, y: 3, direction: "W", commands: [] };
    expect(existsInFallen(scents, robot)).toBeFalsy();
  });
});
