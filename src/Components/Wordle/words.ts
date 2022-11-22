import shuffleArray from "../../utils/shuffleArray"

let words = new Set([
    "apple",
    "world",
    "globe",
    "point",
    "guess",
    "marry",
    "overt",
    "avert",
    "axiom",
    "power",
    "dream",
    "think"
])
let array: string[] = []
words.forEach(word => {
    if (!(word.length != 5 || /[^a-z]/.test(word))) {
        array.push(word)
    }
})
// array = shuffleArray(array);

export {array as words}