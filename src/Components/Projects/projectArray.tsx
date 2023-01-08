import {langs, frontend, backend, misc, Lang} from '../About/vars'


export const stack: {[key: string]: string} = {
    "framer motion": "https://pagepro.co/blog/wp-content/uploads/2020/03/framer-motion.png",
    firestore: "https://res.cloudinary.com/practicaldev/image/fetch/s--VnDDBkku--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/akm5od0383lcbhxvb9zb.png",
    marked: "https://avatars.githubusercontent.com/u/19886934?v=4",
    heroku: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Heroku_logo.svg",
    vercel: "https://logowik.com/content/uploads/images/vercel1868.jpg",
    "entity framework": "https://i.imgur.com/DU7Cbis.png",
    pug: "https://miro.medium.com/max/1012/1*XQrm5n6_iX2mY93lT4d4cA.png",
    "json web token": "/logos/jwt.svg",
    prisma: "https://cdn.worldvectorlogo.com/logos/prisma-2.svg",
    supabase: "https://miro.medium.com/max/1200/1*xOqCfciF90c8nH0HhMpapQ.png",
    render: "https://intellyx.com/wp-content/uploads/2019/08/Render-cloud-intellyx-BC-logo.png",
    netlify: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Netlify_logo.svg"
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
    path?: string,
    external?: boolean,
    description: string,
    stack: string[],
    repo: string
}

export const projectArray: Projs[] = [
    {
        title: "Spaza Game Store",
        img: "/screenshots/spaza.png",
        description: "Full-stack ecommerce website. Developed with TypeScript, React on the frontend and C#, ASP.NET, Entity Framework and Postgres on the backend. Features a JsonWebToken based authentication system. To view a working demo, please clone the repo and run docker-compose up in your terminal.",
        stack: ["typescript", "react", "c#", "postgresql", "entity framework", "asp.net", "bootstrap", "json web token", "docker"],
        repo: "https://github.com/cossieB/spaza-ecommerce"
    },{
        title: "Meme Machine",
        img: "/screenshots/memes.png",
        path: "https://mememachine.vercel.app/",
        external: true,
        description: "Full-stack CRUD application for posting and viewing memes. Developed with TypeScript, Next.js and React. Features a JWT based authentication system and uses MongoDB Atlas as a database. Also made a MySQL version, the code for which can be found on the 'using-mysql' branch of the repo.",
        stack: ["typescript", "next.js", "react", "node.js", "mongodb", "mongoose", "json web token", "vercel", "mysql", "sass"],
        repo: 'https://github.com/cossieB/meme-machine'
    }, {
        title: "Internet Games Database",
        img: "/screenshots/igdb.png",
        path: "https://internet-games-database.vercel.app/",
        external: true,
        description: "CRUD application for adding information about games and the gaming industry. Developed with TypeScript, Next.js, React and SASS. Uses Supabase Postgres as a database and Prisma ORM to interact with the database.",
        stack: ["typescript", "next.js", "react", "node.js", "postgresql", "prisma", "mongodb","supabase", "mongoose", "vercel", "framer motion", "sass"],
        repo: "https://github.com/cossieB/internet-games-database"
    }, {
        title: "Microservices",
        img: "/screenshots/microservices.png",
        path: "https://cossie.netlify.app/",
        external: true,
        description: "Various REST APIs including header parser, file metadata, timestamp microservices, issue and exercise trackers and translator services. Deployed on Netlify and uses serverless Netlify functions.",
        stack: ["typescript", "node.js", "mongodb", "mongoose", "netlify"],
        repo: 'https://github.com/cossieB/serverless'
    }, {
        title: "GraphQL API",
        img: "/screenshots/graphql.png",
        path: "https://cossie.onrender.com/graphql",
        external: true,
        description: "GraphQL API to get data from my Internet Games Database project. Uses express-graphql middleware and the data is stored in Supabase Postgres. Additionally I ported select services from the REST API project to this GraphQL one.",
        stack: ['typescript', 'node.js', 'expressjs', 'postgresql', 'prisma', 'mongodb', 'mongoose', 'pug', 'render', 'supabase', 'graphql'],
        repo: "https://github.com/cossieB/microservices/tree/main/src/graphql"
    },{
        title: "2048",
        img: "/screenshots/2048.png",
        path: "/2048",
        description: "Clone of the 2048 puzzle/strategy game. Features mobile swipe controls. High scores stored in Firestore and local storage. This game has complex logic, so it was quite challenging to develop.",
        stack: ["typescript", "react", "firebase", "framer motion", "firestore", "sass"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/2048"
    },{
        title: "Wordle",
        img: "/screenshots/wordle.png",
        path: "/wordle",
        description: "My recreation of the popular game Wordle",
        stack:  ["typescript", "react", "firebase", "framer motion"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/wordle"
    },{
        title: 'Memory Game',
        path: '/memory',
        img: "/screenshots/memory.png",
        description: "Quiz that tests your memory. Features customizable game size. High scores stored in Firestore and local storage.",
        stack: ["typescript", "react", "firebase", "framer motion", "firestore"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Memory"
    },{
        title: "Sudoku",
        img: 'screenshots/sudoku.png',
        path: "/sudoku",
        description: "Play sudoku. Features clash highlighting and custom puzzle creator. It can also solve most puzzles using the backtracking algorithm.",
        stack: ["typescript", "react", "firebase", "framer motion"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Sudoku"
    },{
        title: "Pomodoro",
        img: "/screenshots/pomodoro.png",
        path: "/pomodoro",
        description: "Timer for the pomodoro technique. You can change the session and the break lengths.",
        stack: ["typescript", "react", "firebase", "framer motion"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Pomodoro"
    }, {
        title: "Calculator",
        img: "/screenshots/calculator.png",
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
        title: "Tower of Hanoi",
        path: "/hanoi",
        img: "/screenshots/hanoi.png",
        description: "Tower of Hanoi game.",
        stack: ["typescript", "react", "firebase", "framer motion"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Hanoi"
    },{
        title: "Random Quote Machine",
        path: "/quotes",
        img: "/screenshots/quotes.png",
        description: "Some lighthearted quotes from across the ages.",
        stack: ["typescript", "react", "firebase", "framer motion"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Quotes"
    }, {
        title: "Markdown Preview",
        path: "markdown-preview",
        img: "/screenshots/markdown.png",
        description: "This neat little tool allows you to type markdown code and instantly see the output. Useful for git README.md files.",
        stack: ["typescript", "react", "firebase", "framer motion", "marked"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Markdown"
    }, {
        title: "Soundboard",
        img: "/screenshots/soundboard.png",
        path: "/soundboard",
        description: "Press a button and play a sound. Features a volume slider",
        stack: ["typescript", "react", "firebase", "framer motion"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Soundboard"
    }, {
        title: "Message Board",
        path: "/forum",
        img: "/screenshots/forum.png",
        description: "User interface for a message board. Messages aren't stored.",
        stack: ["typescript", "react", "firebase", "framer motion"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Forum"
    }]