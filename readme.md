# Red Badger Technical Test

## How to run
1. Install dependencies with `npm i`
2. Run code with `npm start`
3. Test code with `npm test`

## Izaac's Notes

- Not sure if you wanted a frontend for this or not. Happy to make one if necessary.
- This is the simplest and most readable way to solve the problem I could come up with.
- Each robot has a state, x, y, direction and commands.
- We don't need to render a grid at all - we could scale the solution up to a very large grid without issue:
  - See `expect an enormous grid to run in less than 1 s`. This runs in 11ms on my laptop.
- Additional command types can be added in the `data.ts` file:
  - This will automatically update all the types (`export type Command = (typeof commands)[number]`).
- Problems I encountered were the usual off by 1 errors, including the grid and the robot coordinates.
- It didn't make sense to place the scent on the grid with this solution, as we'd have to write lots of extra checks.
  - Instead, we store the state of the fallen robot in scents.
  - If our current robot's next state is equal to a fallen robot state, we skip that step.
- Entry point is `index.ts`. Each file has a test file with the same name.

## Expected output
````
red-badger-robots on  main [!] is 📦 v1.0.0 via  v18.17.1
❯ npm start

> red-badger-robots-2@1.0.0 start
> ts-node index.ts

Input: 53
11E RFRFRFRF
32N FRRFLLFFRRFLL
03W LLFFFLFLFL

Data: {
  robots: [
    { x: 1, y: 1, direction: 'E', commands: [Array] },
    { x: 3, y: 2, direction: 'N', commands: [Array] },
    { x: 0, y: 3, direction: 'W', commands: [Array] }
  ],
  grid: { x: 5, y: 3 }
}

Robot 1 ---
Step 1 { x: 1, y: 1, direction: 'E' } R
Step 2 { x: 1, y: 1, direction: 'S' } F
Step 3 { x: 1, y: 0, direction: 'S' } R
Step 4 { x: 1, y: 0, direction: 'W' } F
Step 5 { x: 0, y: 0, direction: 'W' } R
Step 6 { x: 0, y: 0, direction: 'N' } F
Step 7 { x: 0, y: 1, direction: 'N' } R
Step 8 { x: 0, y: 1, direction: 'E' } F
Step 9 { x: 1, y: 1, direction: 'E' }

Robot 2 ---
Step 1 { x: 3, y: 2, direction: 'N' } F
Step 2 { x: 3, y: 3, direction: 'N' } R
Step 3 { x: 3, y: 3, direction: 'E' } R
Step 4 { x: 3, y: 3, direction: 'S' } F
Step 5 { x: 3, y: 2, direction: 'S' } L
Step 6 { x: 3, y: 2, direction: 'E' } L
Step 7 { x: 3, y: 2, direction: 'N' } F
Step 8 { x: 3, y: 3, direction: 'N' } F
Step 9 { x: 3, y: 4, direction: 'N' } LOST

Robot 3 ---
Step 1 { x: 0, y: 3, direction: 'W' } L
Step 2 { x: 0, y: 3, direction: 'S' } L
Step 3 { x: 0, y: 3, direction: 'E' } F
Step 4 { x: 1, y: 3, direction: 'E' } F
Step 5 { x: 2, y: 3, direction: 'E' } F
Step 6 { x: 3, y: 3, direction: 'E' } L
Step 7 { x: 3, y: 3, direction: 'N' } F
Step 8 { x: 3, y: 3, direction: 'N' } L
Step 9 { x: 3, y: 3, direction: 'W' } F
Step 10 { x: 2, y: 3, direction: 'W' } L
Step 11 { x: 2, y: 3, direction: 'S' }

Result:
11E
33NLOST
23S
````


## Developer Programming Problem
### Introduction
Think of this challenge as an opportunity to show us what “good” looks like to you; and a fun way to showcase your skills.
Here are some tips and guidelines:
- We don’t expect you to spend more than 2-3 hours on this challenge
- If you don’t have time to fully complete the challenge, please still send it in and
indicate what your next steps would be. Remember to try to solve the hardest
problems first.
- Use any language and frameworks you want
- KISS - Keep it Simple Stupid.
- User interface design is not the main focus of the problem
- Put your code on a public source repository (such as GitHub) and give us the URL
- Please `submit your commit history`, we are interested to see how you approach the
challenge and how you verify the validity of your solution.
- We should be able to run your code without any crazy steps
- Secret tip: Make use of the sample data ;)


## Problem: Martian Robots
### The Problem
The surface of Mars can be modelled by a rectangular grid around which robots are able to move according to instructions provided from Earth. You are to write a program that determines each sequence of robot positions and reports the final position of the robot.
- A robot position consists of a grid coordinate (a pair of `integers: x-coordinate followed by y-coordinate`) 
- An orientation (`N, S, E, W` for north, south, east, and west).
- A robot instruction is a string of the letters `“L”, “R”, and “F”` which represent, respectively, the instructions:
  - Left : the robot turns left 90 degrees and remains on the current grid point.
  - Right : the robot turns right 90 degrees and remains on the current grid point.
  - Forward : the robot moves forward one grid point in the direction of the current
  orientation and maintains the same orientation.
- The direction North corresponds to the direction from grid point (x, y) to grid point (x, y+1).


There is also a possibility that `additional command types may be required` in the future and provision should be made for this.

Since the `grid is rectangular and bounded` (...yes Mars is a strange planet), a robot that moves “off” an edge of the grid is lost forever.
- However, lost robots leave a robot “scent” that prohibits future robots from dropping off the world at the same grid point.
- The scent is left at the last grid position the robot occupied before disappearing over the edge.
- `An instruction to move “off” is ignored` ... the world from a grid point from which a robot has been previously lost is simply ignored by the current robot.

### The Input
- The `first line of input is the upper-right coordinates of the rectangular world`, the lower-left coordinates are assumed to be 0, 0. 
- Next `two integers specifying the initial coordinates of the robot and an orientation (N, S, E, W)`
- A robot instruction is a string of the letters `“L”, “R”, and “F”` on one line.
- `Each robot is processed sequentially`, i.e., finishes executing the robot instructions before the next robot begins execution.
- `The maximum value for any coordinate is 50`.
- `All instruction strings will be less than 100 characters in length.`

### The Output
- For each robot position/instruction in the input, the output should indicate the final grid position and orientation of the robot.
If a robot falls off the edge of the grid the word “LOST” should be printed after the position and orientation.
#### Sample Input
````
53 (grid size 5x3)
11E RFRFRFRF
32N FRRFLLFFRRFLL
03W LLFFFLFLFL
````
#### Sample Output
````
11E
33NLOST
23S
````

