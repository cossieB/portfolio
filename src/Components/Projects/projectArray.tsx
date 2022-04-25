import {langs, frontend, backend, misc, Lang} from '../About/vars'

export const stack: {[key: string]: string} = {
    "framer motion": "https://pagepro.co/blog/wp-content/uploads/2020/03/framer-motion.png",
    firestore: "https://res.cloudinary.com/practicaldev/image/fetch/s--VnDDBkku--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/akm5od0383lcbhxvb9zb.png",
    marked: "https://avatars.githubusercontent.com/u/19886934?v=4",
    heroku: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Heroku_logo.svg",
    vercel: "https://logowik.com/content/uploads/images/vercel1868.jpg",
    "entity framework": "https://i.imgur.com/DU7Cbis.png"
}
const arr = [langs, frontend, backend, misc]


function updateStack(arr: Lang[]) {
    arr.forEach(item => {
        stack[item.language.toLowerCase()] = item.logo
    })
}
arr.forEach(item => {
    updateStack(item)
})

export interface Projs {
    title: string,
    img: string,
    path: string,
    external?: boolean,
    description: string,
    stack: string[]
}


export const projectArray: Projs[] = [
    {
        title: "Meme Machine",
        img: "screenshots/memes.png",
        path: "https://mememachine.vercel.app/",
        external: true,
        description: "CRUD application for posting and viewing memes. Features a JWT based authentication system. Uses MongoDB Atlas as a database. Also ported to MySQL",
        stack: ["typescript", "next.js", "node.js", "mongodb", "mongoose", "json web token", "vercel", "mysql"]
    },
    {
        title: "Microservices",
        img: "screenshots/microservices.png",
        path: "https://cossie.herokuapp.com/",
        external: true,
        description: "Various REST APIs including header parser, file metadata and timestamp microservices. Deployed on Heroku.",
        stack: ["typescript", "node.js", "expressjs", "mongodb", "mongoose", "heroku"]
    },
    {
        title: "Internet Games Database",
        img: "screenshots/IGDB.png",
        path: "http://cossie-001-site1.ftempurl.com/",
        external: true,
        description: "CRUD application for adding information about games and the gaming industry.",
        stack: ["c#", "asp.net", "bootstrap", "entity framework"]
    },
    {
        title: "Pomodoro",
        img: "screenshots/pomodoro.png",
        path: "/pomodoro",
        description: "Timer for the pomodoro technique. You can change the session and the break lengths.",
        stack: ["typescript", "react", "firebase", "framer motion"]
    }, {
        title: "Calculator",
        img: "screenshots/calculator.png",
        path: "/calculator",
        description: "Non-scientific calculator.",
        stack: ["typescript", "react", "firebase", "framer motion"]
    }, {
        title: 'Quiz',
        path: '/quiz',
        img: 'screenshots/quiz.png',
        description: "Quiz that tests your mental math skills. High scores stored in Firestore and local storage.",
        stack: ["typescript", "react", "firebase", "framer motion", "firestore"]
    }, {
        title: 'Memory Game',
        path: '/memory',
        img: "/screenshots/memory.png",
        description: "Quiz that tests your memory. High scores stored in Firestore and local storage.",
        stack: ["typescript", "react", "firebase", "framer motion", "firestore"]
    }, {
        title: "Random Quote Machine",
        path: "/quotes",
        img: "screenshots/quotes.png",
        description: "Some lighthearted quotes from across the ages.",
        stack: ["typescript", "react", "firebase", "framer motion"]
    }, {
        title: "Markdown Preview",
        path: "markdown-preview",
        img: "screenshots/markdown.png",
        description: "This neat little tool allows you to type markdown code and instantly see the output. Useful for git README.md files.",
        stack: ["typescript", "react", "firebase", "framer motion", "marked"]
    }, {
        title: "Soundboard",
        img: "screenshots/soundboard.png",
        path: "/soundboard",
        description: "Press a button and play a sound. Features a volume slider",
        stack: ["typescript", "react", "firebase", "framer motion"]
    }, {
        title: "Message Board",
        path: "/forum",
        img: "screenshots/forum.png",
        description: "User interface for a message board. Messages aren't stored.",
        stack: ["typescript", "react", "firebase", "framer motion"]
    }]