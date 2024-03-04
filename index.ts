console.log("Project created.")

const sampleInput =
    `53
11E RFRFRFRF
32N FRRFLLFFRRFLL
03W LLFFFLFLFL`

const sampleOutput = `
11E
33NLOST
23S
`

const directions = ['N', 'E', 'S', 'W'] as const
const commands = ['L', 'R', 'F'] as const

type Direction = typeof directions
type Command = typeof commands
interface Robot {
    x: number
    y: number
    direction: Direction
    commands: Command[]
}


function parseData(input: string) {
    // Less than 100 chars so lets go for the easiest to read way
    let split = input.split('\n')
    if (!split || split.length < 2) {
        throw new Error('Parsing problem')
    }
    // Gets grid from 0. Is 0-2 a grid size of 3? Maybe...
    const gridSize = split.shift()!.split(' ')[0].split('').map((n) => Number(n) - 1)
    const robotData = split.map(d => d.split(' ').map(s => s.split('')))

    // Gets some simple to understand robots. Assuming input data is all correct.
    const robots = robotData.map(r => {
        const direction = r[0][2] as unknown as Direction
        const commands = r[1] as unknown as Command[]
        return {x: Number(r[0][0]), y: Number(r[0][1]), direction, commands} as Robot
    })

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

    return {robots, gridSize}
}

function main() {
    const {robots, gridSize} = parseData(sampleInput)
}

main()
