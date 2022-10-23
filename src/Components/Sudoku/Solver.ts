export interface Cell {
    value: string,
    readonly row: number,
    readonly column: number,
    readonly region: number,
    readonly frozen: boolean,
    readonly cellNumber: number
}

export default class Solver {
    readonly puzzleString: string;
    readonly array: Cell[]

    constructor(puzzleString: string) {
        const validation = Solver.validate(puzzleString)
        if (validation[0] == false) throw new Error(validation[1])
        this.puzzleString = puzzleString
        this.array = this.getArray()
    }
    static validate(str: string): [true] | [false, string] {
        if (str.length != 81) return [false, 'Expected puzzle to be 81 characters long']
        for (let letter of str) {
            if (!/[1-9]|\./.test(letter)) return [false, 'Invalid characters in puzzle']
        }
        return [true]
    }
    private getArray() {
        let arr: Cell[] = []
        for (let i = 0; i < 81; i++) {
            const value = this.puzzleString[i]
            const row = Math.floor(i / 9)
            const column = i % 9
            let region: number

            if (row < 3 && column < 3) region = 0
            else if (row < 3 && column < 6) region = 1
            else if (row < 3 && column < 9) region = 2
            else if (row < 6 && column < 3) region = 3
            else if (row < 6 && column < 6) region = 4
            else if (row < 6 && column < 9) region = 5
            else if (row < 9 && column < 3) region = 6
            else if (row < 9 && column < 6) region = 7
            else region = 8

            arr.push({ value, row, column, region, frozen: value !== '.', cellNumber: i })
        }
        return arr
    }
    private placeNumber(cellNumber: number, direction: number) {

        const cell = this.array[cellNumber]
        let num: number;

        if (direction == 1) {
            num = 1
        }
        else {
            num = Number(cell.value) + 1
        }
        while (num <= 9) {
            let checkColumn = true;
            let checkRow = true;
            let checkRegion = true;

            for (let item of this.array) {
                if (item.column == cell.column && item.value == num.toString()) {
                    checkColumn = false;
                }
                if (item.row == cell.row && item.value == num.toString()) {
                    checkRow = false;
                }
                if (item.region == cell.region && item.value == num.toString()) {
                    checkRegion = false;
                }
            }
            if (checkColumn && checkRegion && checkRow) {
                return num.toString();
            }
            num++;
        }
        return '.'
    }
    check() {
        const answers = this.array.filter(item => !item.frozen && item.value != '.')
        let clashes = {
            row: new Set<Cell>(),
            column: new Set<Cell>(),
            region: new Set<Cell>()
        }
        answers.forEach(cell => {

            const checkColumn = this.array
                .filter(item => item.column == cell.column && item.cellNumber != cell.cellNumber)
                .every(item => item.value != cell.value)

            const checkRow = this.array
                .filter(item => item.row == cell.row && item.cellNumber != cell.cellNumber)
                .every(item => item.value != cell.value)

            const checkRegion = this.array
                .filter(item => item.region == cell.region && item.cellNumber != cell.cellNumber)
                .every(item => item.value != cell.value)

            !checkColumn && clashes.column.add(cell)
            !checkRow && clashes.row.add(cell)
            !checkRegion && clashes.region.add(cell)
        })
        return clashes
    }
    async solve() {
        await Promise.resolve();
        this.reset();
        const blanks = this.array.filter(item => !item.frozen);
        let position = 0;
        let direction = 1;
        let counter = 0
        while (counter < 3000000) {
            let cell = blanks[position];
            let result = this.placeNumber(cell.cellNumber, direction);
            direction = result === '.' ? -1 : 1;
            cell.value = result;
            position += direction;
            counter++
            if (position < 0 || position >= blanks.length)
                break;
        }
        if (this.array.some(item => item.value == '.')){
            this.reset();
            return false;
        }
        else
            return true;
    }
    reset() {
        this.array.forEach(cell => {
            if (!cell.frozen)
                cell.value = '.';
        });
    }
}