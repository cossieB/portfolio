import {langs, frontend, backend, misc, Lang} from '../About/vars'

export const stack: {[key: string]: string} = {
    "framer motion": "https://pagepro.co/blog/wp-content/uploads/2020/03/framer-motion.png",
    firestore: "https://res.cloudinary.com/practicaldev/image/fetch/s--VnDDBkku--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/akm5od0383lcbhxvb9zb.png",
    marked: "https://avatars.githubusercontent.com/u/19886934?v=4",
    heroku: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Heroku_logo.svg",
    vercel: "https://logowik.com/content/uploads/images/vercel1868.jpg",
    "entity framework": "https://i.imgur.com/DU7Cbis.png",
    pug: "https://miro.medium.com/max/1012/1*XQrm5n6_iX2mY93lT4d4cA.png"
}
const sections = [langs, frontend, backend, misc]


function updateStack(arr: Lang[]) {
    arr.forEach(item => {
        stack[item.language.toLowerCase()] = item.logo
    })
}
sections.forEach(item => {
    updateStack(item)
})

export interface Projs {
    title: string,
    img: string,
    path: string,
    external?: boolean,
    description: string,
    stack: string[],
    repo: string
}


export const projectArray: Projs[] = [
    {
        title: "Meme Machine",
        img: "screenshots/memes.png",
        path: "https://mememachine.vercel.app/",
        external: true,
        description: "Full-stack CRUD application for posting and viewing memes. Developed with TypeScript, Next.js and React. Features a JWT based authentication system and uses MongoDB Atlas as a database. Also ported to MySQL",
        stack: ["typescript", "next.js", "react", "node.js", "mongodb", "mongoose", "json web token", "vercel", "mysql", "sass"],
        repo: 'https://github.com/cossieB/meme-machine'
    }, {
        title: "Microservices",
        img: "screenshots/microservices.png",
        path: "https://cossie.herokuapp.com/",
        external: true,
        description: "Various REST APIs including header parser, file metadata and timestamp microservices. Deployed on Heroku.",
        stack: ["typescript", "node.js", "expressjs", "mongodb", "mongoose", "pug", "heroku"],
        repo: 'https://github.com/cossieB/microservices'
    }, {
        title: "Internet Games Database",
        img: "screenshots/igdb.png",
        path: "https://internet-games-database.vercel.app/",
        external: true,
        description: "CRUD application for adding information about games and the gaming industry.",
        stack: ["typescript", "next.js", "react", "node.js", "mongodb", "mongoose", "vercel", "framer motion", "sass"],
        repo: "https://github.com/cossieB/internet-games-database"
    }, {
        title: "Sudoku",
        img: 'screenshots/sudoku.png',
        path: "/sudoku",
        description: "Play sudoku. Features clash highlighting and custom puzzle creator. It can also solve most puzzles using the backtracking algorithm.",
        stack: ["typescript", "react", "firebase", "framer motion"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Sudoku"
    }, {
        title: "Pomodoro",
        img: "screenshots/pomodoro.png",
        path: "/pomodoro",
        description: "Timer for the pomodoro technique. You can change the session and the break lengths.",
        stack: ["typescript", "react", "firebase", "framer motion"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Pomodoro"
    }, {
        title: "Calculator",
        img: "screenshots/calculator.png",
        path: "/calculator",
        description: "Non-scientific calculator.",
        stack: ["typescript", "react", "firebase", "framer motion"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Calculator"
    }, {
        title: 'Quiz',
        path: '/quiz',
        img: 'screenshots/quiz.png',
        description: "Quiz that tests your mental math skills. High scores stored in Firestore and local storage.",
        stack: ["typescript", "react", "firebase", "framer motion", "firestore"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Quiz"
    }, {
        title: 'Memory Game',
        path: '/memory',
        img: "/screenshots/memory.png",
        description: "Quiz that tests your memory. High scores stored in Firestore and local storage.",
        stack: ["typescript", "react", "firebase", "framer motion", "firestore"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Memory"
    }, {
        title: "Random Quote Machine",
        path: "/quotes",
        img: "screenshots/quotes.png",
        description: "Some lighthearted quotes from across the ages.",
        stack: ["typescript", "react", "firebase", "framer motion"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Quotes"
    }, {
        title: "Markdown Preview",
        path: "markdown-preview",
        img: "screenshots/markdown.png",
        description: "This neat little tool allows you to type markdown code and instantly see the output. Useful for git README.md files.",
        stack: ["typescript", "react", "firebase", "framer motion", "marked"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Markdown"
    }, {
        title: "Soundboard",
        img: "screenshots/soundboard.png",
        path: "/soundboard",
        description: "Press a button and play a sound. Features a volume slider",
        stack: ["typescript", "react", "firebase", "framer motion"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Soundboard"
    }, {
        title: "Message Board",
        path: "/forum",
        img: "screenshots/forum.png",
        description: "User interface for a message board. Messages aren't stored.",
        stack: ["typescript", "react", "firebase", "framer motion"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Forum"
    }]