import shuffleArray from "../../utils/shuffleArray"

let words = new Set([
    "hello",
    "world",
    "array",
    "effect",
    "route",
    "solve",
    "setup",
    "react",
    "mouse",
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
    "daisy",
    "crust",
    "fiend",
    "super",
    "about",
    "round",
    "crime",
    "quote",
    "brown",
    "dance",
    "rugby",
    "quiet",
    "quite",
    "slang",
    "alert",
    "ghost",
    "today",
    "guest",
    "tower",
    "stone",
    "scale",
    "steal",
    "slack",
    "slate",
    "crazy",
    "sleep",
    "angry",
    "trail",
    "glass",
    "alarm",
    "awake",
    "bread",
    "churn",
    "pound",
    "stick",
    "snack",
    "local",
    "media",
    "visual",
    "weave",
    "photo",
    "night",
    "model",
    "track",
    "drown",
    "drive",
    "wheel",
    "table",
    "glory",
    "heart",
    "liver",
    "spine",
    "chunk"
])
let array: string[] = []
words.forEach(word => {
    if (!(word.length != 5 || /[^a-z]/.test(word))) {
        array.push(word)
    }
})
array = shuffleArray(array);

export {array as words}