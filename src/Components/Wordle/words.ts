import shuffleArray from "../../utils/shuffleArray"

let words = new Set([
    "hello",
    "world",
    "apple",
    "globe",
    "phone",
    "video",
    "point",
    "prime",
    "guess",
    "marry",
    "overt",
    "avert",
    "axiom",
    "power",
    "dream",
    "think",
    "chart",
    "chasm",
    "toast",
    "proof",
    "trust",
    "truth",
    "queen",
    "daisy"
])
let array: string[] = []
words.forEach(word => {
    if (!(word.length != 5 || /[^a-z]/.test(word))) {
        array.push(word)
    }
})
array = shuffleArray(array);

export {array as words}