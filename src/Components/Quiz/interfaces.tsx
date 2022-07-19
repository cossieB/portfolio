export interface P333 {
    user: string,
    total: number,
    correct: number,
    setTotal: React.Dispatch<React.SetStateAction<number>>,
    setCorrect: React.Dispatch<React.SetStateAction<number>>,
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>,
    difficulty: number
}
export interface P123 extends P333 {
    setUser: React.Dispatch<React.SetStateAction<string>>,
}

export interface Scores {
    name: string,
    date: Date,
    score: number,
    difficulty: number
}

export interface P11 {
    setReadInstructions: React.Dispatch<React.SetStateAction<boolean>>
}
export interface P084 {
    user: string,
    correct: number,
    total: number
}
export interface P {
    setCorrect: React.Dispatch<React.SetStateAction<number>>,
    setTotal: React.Dispatch<React.SetStateAction<number>>,
    total: number,
    difficulty: number
}
export interface S {
    userInput: string,
    question: string,
    answer: number,
    time: number,
}
export interface P71 {
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void, 
    handleEnter: () => void,
    handleDelete: () => void
}
export interface P9155 {
    next: (q: string, a: number) => void,
    total: number,
    difficulty: number
}
