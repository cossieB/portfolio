import { langs, frontend, backend, misc, Lang } from '../About/vars'

export const stack: { [key: string]: string } = {
    "Framer Motion": "https://pagepro.co/blog/wp-content/uploads/2020/03/framer-motion.png",
    Firestore: "https://res.cloudinary.com/practicaldev/image/fetch/s--VnDDBkku--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/akm5od0383lcbhxvb9zb.png",
    Marked: "https://avatars.githubusercontent.com/u/19886934?v=4",
    Vercel: "https://logowik.com/content/uploads/images/vercel1868.jpg",
    "Entity Framework": "https://i.imgur.com/DU7Cbis.png",
    "Json Web Token": "/logos/jwt.svg",
    Supabase: "https://miro.medium.com/max/1200/1*xOqCfciF90c8nH0HhMpapQ.png",
    Netlify: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Netlify_logo.svg",
    Apollo: "https://user-images.githubusercontent.com/841294/53402609-b97a2180-39ba-11e9-8100-812bab86357c.png",
    tRPC: "https://trpc.io/img/logo.svg",
    Imgur: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Imgur_logo.svg"
}
const sections = [langs, frontend, backend, misc]

function updateStack(arr: Lang[]) {
    arr.forEach(item => {
        stack[item.language] = item.logo
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
        title: "Meme Machine",
        img: "/screenshots/memes.png",
        path: "https://mememachine.vercel.app/",
        external: true,
        description: "Full-stack CRUD application for posting and viewing memes. Features 'like', 'follow' functionality and OAuth login with Google and Facebook. Developed with TypeScript, Next.js, React and Tailwind CSS. Images are uploaded to Imgur using the Imgur API. The data is stored in Supabase PostgreSQL and Prisma ORM is used to interact with the database. Uses the Next-Auth library for authentication and tRPC to bridge the front-end and back-end. ",
        stack: ["TypeScript", "Next.js", "React", "Node.JS", "PostgreSQL", "Prisma", "Supabase", "Json Web Token", "Vercel", "tRPC", "Tailwind", "Imgur"],
        repo: 'https://github.com/cossieB/meme-machine'
    }, {
        title: "Spaza Game Store",
        img: "/screenshots/spaza.png",
        description: "Full-stack ecommerce website. Developed with TypeScript, React on the frontend and C#, ASP.NET, Entity Framework and Postgres on the backend. Features a JsonWebToken based authentication system. To view a working demo, please clone the repo and run docker-compose up in your terminal.",
        stack: ["TypeScript", "React", "C#", "PostgreSQL", "Entity Framework", "ASP.NET", "Bootstrap", "Json Web Token", "Docker"],
        repo: "https://github.com/cossieB/spaza-ecommerce"
    }, {
        title: "Internet Games Database",
        img: "/screenshots/igdb.png",
        path: "https://internet-games-database.vercel.app/",
        external: true,
        description: "CRUD application for adding information about games and the gaming industry. Developed with TypeScript, Next.js, React and SASS. Uses Supabase Postgres as a database and Prisma ORM to interact with the database.",
        stack: ["TypeScript", "Next.js", "React", "Node.JS", "PostgreSQL", "Prisma", "MongoDB", "Supabase", "Mongoose", "Vercel", "Framer Motion", "SASS"],
        repo: "https://github.com/cossieB/internet-games-database"
    }, {
        title: "Microservices",
        img: "/screenshots/microservices.png",
        path: "https://cossie.netlify.app/",
        external: true,
        description: "Various REST APIs including header parser, file metadata, timestamp microservices, issue and exercise trackers and translator services. Deployed on Netlify and uses serverless Netlify functions.",
        stack: ["TypeScript", "Node.JS", "MongoDB", "Mongoose", "Netlify"],
        repo: 'https://github.com/cossieB/serverless'
    }, {
        title: "GraphQL API",
        img: "/screenshots/graphql.png",
        path: "https://internet-games-database.vercel.app/api/graphql",
        external: true,
        description: "GraphQL API to get data from my Internet Games Database project. The project is deployed on Vercel and it uses Apollo Server. The data is stored in Supabase Postgres.",
        stack: ["TypeScript", "Node.JS", "Next.js", "PostgreSQL", "Prisma", 'Apollo', 'Supabase', 'GraphQL', "Vercel"],
        repo: "https://github.com/cossieB/internet-games-database/tree/main/graphql"
    }, {
        title: "2048",
        img: "/screenshots/2048.png",
        path: "/2048",
        description: "Clone of the 2048 puzzle/strategy game. Features mobile swipe controls. High scores stored in Firestore and local storage. This game has complex logic, so it was quite challenging to develop.",
        stack: ["TypeScript", "React", "Firebase", "Framer Motion", "Firestore", "SASS"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/2048"
    }, {
        title: "Wordle",
        img: "/screenshots/wordle.png",
        path: "/wordle",
        description: "My recreation of the popular game Wordle",
        stack: ["TypeScript", "React", "Firebase", "Framer Motion"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/wordle"
    }, {
        title: 'Memory Game',
        path: '/memory',
        img: "/screenshots/memory.png",
        description: "Quiz that tests your memory. Features customizable game size. High scores stored in Firestore and local storage.",
        stack: ["TypeScript", "React", "Firebase", "Framer Motion", "Firestore"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Memory"
    }, {
        title: "Sudoku",
        img: 'screenshots/sudoku.png',
        path: "/sudoku",
        description: "Play sudoku. Features clash highlighting and custom puzzle creator. It can also solve most puzzles using the backtracking algorithm.",
        stack: ["TypeScript", "React", "Firebase", "Framer Motion"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Sudoku"
    }, {
        title: "Pomodoro",
        img: "/screenshots/pomodoro.png",
        path: "/pomodoro",
        description: "Timer for the pomodoro technique. You can change the session and the break lengths.",
        stack: ["TypeScript", "React", "Firebase", "Framer Motion"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Pomodoro"
    }, {
        title: "Calculator",
        img: "/screenshots/calculator.png",
        path: "/calculator",
        description: "Non-scientific calculator.",
        stack: ["TypeScript", "React", "Firebase", "Framer Motion"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Calculator"
    }, {
        title: 'Quiz',
        path: '/quiz',
        img: 'screenshots/quiz.png',
        description: "Quiz that tests your mental math skills. High scores stored in Firestore and local storage.",
        stack: ["TypeScript", "React", "Firebase", "Framer Motion", "Firestore"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Quiz"
    }, {
        title: "Tower of Hanoi",
        path: "/hanoi",
        img: "/screenshots/hanoi.png",
        description: "Tower of Hanoi game.",
        stack: ["TypeScript", "React", "Firebase", "Framer Motion"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Hanoi"
    }, {
        title: "Random Quote Machine",
        path: "/quotes",
        img: "/screenshots/quotes.png",
        description: "Some lighthearted quotes from across the ages.",
        stack: ["TypeScript", "React", "Firebase", "Framer Motion"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Quotes"
    }, {
        title: "Markdown Preview",
        path: "markdown-preview",
        img: "/screenshots/markdown.png",
        description: "This neat little tool allows you to type markdown code and instantly see the output. Useful for git README.md files.",
        stack: ["TypeScript", "React", "Firebase", "Framer Motion", "Marked"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Markdown"
    }, {
        title: "Soundboard",
        img: "/screenshots/soundboard.png",
        path: "/soundboard",
        description: "Press a button and play a sound. Features a volume slider",
        stack: ["TypeScript", "React", "Firebase", "Framer Motion"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Soundboard"
    }, {
        title: "Message Board",
        path: "/forum",
        img: "/screenshots/forum.png",
        description: "User interface for a message board. Messages aren't stored.",
        stack: ["TypeScript", "React", "Firebase", "Framer Motion"],
        repo: "https://github.com/cossieB/portfolio/tree/main/src/Components/Forum"
    }]