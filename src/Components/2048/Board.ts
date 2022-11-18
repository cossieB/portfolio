interface P {
    top: number
    left: number
    value: number
    id: number
    index: number
}

export class Block implements P {

    public left: number;
    public top: number;
    public value: number;
    readonly id: number;

    constructor (left: number, top: number, id: number) {
        this.value = Math.random() < 0.75 ? 2 : 4;
        this.left = left;
        this.top = top;
        this.id = id;
    }
    get index() {
        return 4 * this.top + this.left
    }

}