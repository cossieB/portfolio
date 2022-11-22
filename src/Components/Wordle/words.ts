import shuffleArray from "../../utils/shuffleArray"

let words: string[] = [
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
    "dream"
]
words.forEach(word => {
    if (word.length != 5) throw new Error(`${word} isn't five letters long.`)
    if (/[^a-z]/.test(word)) throw new Error(`${word} contains non-letter characters`)
})

words = shuffleArray(words);
export {words}