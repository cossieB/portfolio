import shuffleArray from "../../utils/shuffleArray"

let words = new Set([
    "hello",
    "world",
    "array",
    "state",
    "effect",
    "route",
    "cloud",
    "solve",
    "setup",
    "react",
    "class",
    "mouse",
    "graph",
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
    "prove",
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
    "chunk",
    "trunk",
    "stone",
    "smile",
    "sharp",
    "happy",
    "solid",
    "taunt",
    "scare",
    "count",
    "frown",
    "pride",
    "white",
    "voice",
    "truck",
    "black",
    "drift",
    "serve",
    "forum",
    "prism",
    "slime",
    "craft",
    "plant",
    "snake",
    "clock",
    "right",
    "clear",
    "court",
    "viola",
    "piano",
    "flute",
    "train",
    "beard",
    "drone",
    "codec",
    "prone",
    "brick",
    "flash",
    "strut",
    "cable",
    "giant",
    "titan",
    "chief",
    "clone",
    "shark",
    "shred",
    "decay",
    "story",
    "title",
    "badge",
    "wedge",
    "modem",
    "braid",
    "flush",
    "flask",
    "spark",
    "stray",
    "fight",
    "knife",
    "paper",
    "royal",
    "enemy",
    "quest",
    "crumb",
    "daily",
    "space",
    "dress",
    "light",
    "trial",
    "music",
    "diary",
    "cover",
    "build",
    "excel",
    "frame",
    "crane",
    "river",
    "trade",
    "skill",
    "cramp",
    "vocal",
    "karma",
    "fresh",
    "block",
    "level",
    "chord",
    "stove",
    "early",
    "smart",
    "dwarf",
    "sweet",
    "broad",
    "grade",
    "genre",
    "bully",
    "fence",
    "trick",
    "chess",
    "share",
    "cross",
    "metal",
    "opera",
    "freak",
    "embed",
    "board",
    "bison",
    "smoke",
    "sound",
    "speed",
    "angel",
    "demon",
    "devil",
    "angle",
    "sword",
    "chest",
    "medal",
    "batch",
    "moron",
    "idiot",
    "lemon",
    "style",
    "sheet",
    "match",
    "fetch",
    "human",
    "drink",
    "drunk",
    "cream",
    "choke",
    "sleep",
    "learn",
    "steam",
    "trend",
    "storm",
    "drool",
    "steak",
    "guide",
    "straw",
    "stork",
    "store",
    "print",
    "prank",
    "press",
    "stump",
    "stack",
    "magic",
    "idiom",
    "laser",
    "stamp",
    "rover",
    "greek",
    "grace",
    "proud",
    "coder",
    "sweep",
    "place",
    "clamp",
    "clean",
    "split",
    "grant",
    "drove",
    "grove",
    "gripe",
    "grape",
    "alive",
    "about",
    "rapid",
    "rabid",
    "stand",
    "adept",
    "adapt",
    "adopt",
    "eject",
    "joint",
    "alert",
    "death",
    "plead",
    "plaid",
    "munch",
    "gravy",
    "steel",
    "steer",
    "grave",
    "stake",
    "skate",
    "skunk",
    "float",
    "plane",
    "plain",
    "feint",
    "faint",
    "brand",
    "plate",
    "brave",
    "woman",
    "brake",
    "trash",
    "exist",
    "heist",
    "beast",
    "feast",
    "reply",
    "cigar",
    "treat",
    "ether",
    "stomp",
    "stock",
    "stark",
    "range",
    "house",
    "diner",
    "green",
    "paint",
    "thank",
    "taint",
    "swell",
    "small",
    "grown",
    "group",
    "major",
    "minor",
    "dairy",
    "crash",
    "union",
    "grand"
])

let array: string[] = []
words.forEach(word => {
    if (!(word.length != 5 || /[^a-z]/.test(word))) {
        array.push(word)
    }
})
array = shuffleArray(array);

export {array as words}