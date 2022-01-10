export interface P123 {
    user: string,
    correct: number,
    total: number,
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>
    setTotal: React.Dispatch<React.SetStateAction<number>>,
    setCorrect: React.Dispatch<React.SetStateAction<number>>,    
}

export interface Scores {
    name: string,
    date: Date,
    score: number
}

export interface P11 {
    setReadInstructions: React.Dispatch<React.SetStateAction<boolean>>
}
export interface P333 {
    user: string,
    total: number,
    correct: number,
    setTotal: React.Dispatch<React.SetStateAction<number>>,
    setCorrect: React.Dispatch<React.SetStateAction<number>>,
    setGameOver: React.Dispatch<React.SetStateAction<boolean>>
}
export interface P084 {
    user: string,
    correct: number,
    total: number
}
export interface P {
    setCorrect: React.Dispatch<React.SetStateAction<number>>,
    setTotal: React.Dispatch<React.SetStateAction<number>>,
    total: number
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
    total: number
}
