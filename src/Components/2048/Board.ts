export default class Board {
    public array: (Block | null)[] = new Array(16).fill(null)

    constructor() {
        this.createBlock()
        this.createBlock()
    }

    createBlock() {
        const empties = this.array.filter(item => item == null) 
        const index = Math.floor(Math.random() * empties.length)
        this.array[index] = new Block(index)
        return this.array
    }
}

export class Block {

    public value: number
    public index: number

    constructor (index: number) {
        this.index = index;
        this.value = Math.random() < 0.75 ? 2 : 4;
    }
    top() {
        return Math.floor(this.index / 4)
    }
    left() {
        return this.index % 4
    }
}