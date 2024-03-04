import { main } from "../index";
import { sampleInput, sampleOutput } from "../data";

const oneDropN = `53
33N FFFFF`;
const twoDropsN = `53
33N FFFFF
33N FFFFF`;
const twoDropsDiffN = `53
33N FFFFF
22N FFFFF`;

const oneDropW = `53
33W FFFFF`;
const twoDropsW = `53
33W FFFFF
33W FFFFF`;
const twoDropsDiffW = `53
33W FFFFF
22W FFFFF`;

const oneDropE = `53
33E FFFFF`;
const twoDropsE = `53
33E FFFFF
33E FFFFF`;
const twoDropsDiffE = `53
33E FFFFF
22E FFFFF`;

const oneDropS = `53
33S FFFFF`;
const twoDropsS = `53
33S FFFFF
33S FFFFF`;
const twoDropsDiffS = `53
33S FFFFF
22S FFFFF`;

const immediateFail = `11
12E F`;

const turnLeft = `53
12N L`;

const turnRight = `53
12N R`;

const goForwards = `53
12N F`;

export const invalidGrid = `5
12N F`;

export const invalidCoords = `53
N F`;

const blankString = ``;

describe("main function tests", () => {
  test("main function should return the output sample when given the input sample", () => {
    expect(main(sampleInput)).toBe(sampleOutput);
  });

  // North edge
  test("robot drops off the north edge and returns LOST", () => {
    expect(main(oneDropN)).toContain("LOST");
  });
  test("two robots can't drop off at the same point on the north edge", () => {
    const result = main(twoDropsN);
    const matches = result.match(new RegExp("LOST", "g"));
    expect(matches).toHaveLength(1);
  });
  test("two robots can drop off at different point on the north edge", () => {
    const result = main(twoDropsDiffN);
    const matches = result.match(new RegExp("LOST", "g"));
    expect(matches).toHaveLength(2);
  });

  // West edge
  test("robot drops off the west edge and returns LOST", () => {
    expect(main(oneDropW)).toContain("LOST");
  });
  test("two robots can't drop off at the same point on the west edge", () => {
    const result = main(twoDropsW);
    const matches = result.match(new RegExp("LOST", "g"));
    expect(matches).toHaveLength(1);
  });
  test("two robots can drop off at different point on the west edge", () => {
    const result = main(twoDropsDiffW);
    const matches = result.match(new RegExp("LOST", "g"));
    expect(matches).toHaveLength(2);
  });

  // South edge
  test("robot drops off the south edge and returns LOST", () => {
    expect(main(oneDropS)).toContain("LOST");
  });
  test("two robots can't drop off at the same point on the south edge", () => {
    const result = main(twoDropsS);
    const matches = result.match(new RegExp("LOST", "g"));
    expect(matches).toHaveLength(1);
  });
  test("two robots can drop off at different point on the south edge", () => {
    const result = main(twoDropsDiffS);
    const matches = result.match(new RegExp("LOST", "g"));
    expect(matches).toHaveLength(2);
  });

  test("reports LOST if robot is spawned out of bounds", () => {
    expect(main(immediateFail)).toContain("LOST");
  });

  // East edge
  test("robot drops off the east edge and returns LOST", () => {
    expect(main(oneDropE)).toContain("LOST");
  });
  test("two robots can't drop off at the same point on the east edge", () => {
    const result = main(twoDropsE);
    const matches = result.match(new RegExp("LOST", "g"));
    expect(matches).toHaveLength(1);
  });
  test("two robots can drop off at different point on the east edge", () => {
    const result = main(twoDropsDiffE);
    const matches = result.match(new RegExp("LOST", "g"));
    expect(matches).toHaveLength(2);
  });

  test("reports LOST if robot is spawned out of bounds", () => {
    expect(main(immediateFail)).toContain("LOST");
  });

  test("L makes the robot turn left to the west", () => {
    expect(main(turnLeft)).toContain("12W");
  });

  test("R makes the robot turn right to the east", () => {
    expect(main(turnRight)).toContain("12E");
  });

  test("F makes the robot go forwards one space", () => {
    expect(main(goForwards)).toContain("13N");
  });

  test("invalid grid throws an error", () => {
    expect(() => main(invalidGrid)).toThrow("Invalid grid");
  });

  test("invalid coords throws an error", () => {
    expect(() => main(invalidCoords)).toThrow("Invalid coords");
  });

  test("blank string throws an error", () => {
    expect(() => main(blankString)).toThrow("Parsing problem");
  });
});
