export interface Lang {
    language: string,
    logo: string, 
    skill: number
}

export const langs: Lang[] = [
    {
        language: "TypeScript",
        logo: "/logos/typescript.png",
        skill: 4
    },
    {
        language: "JavaScript",
        logo: "/logos/javascript.png",
        skill: 4
    },
    {
        language: "Python",
        logo: "/logos/python.png",
        skill: 3
    },
    {
        language: "C#",
        logo: '/logos/csharp.svg',
        skill: 2
    },
    {
        language: "HTML",
        logo: "/logos/html.png",
        skill: 5
    },
    {
        language: "CSS",
        logo: "/logos/css.png",
        skill: 4
    }, 
]

export const frontend: Lang[] = [
    {
        language: 'React',
        logo: "/logos/react.png",
        skill: 4
    },
    {
        language: "Next.js",
        logo: "/logos/next.png",
        skill: 4
    },
    {
        language: "jQuery",
        logo: "/logos/jquery.png",
        skill: 1
    },
    {
        language: "SASS",
        logo: "/logos/sass.png",
        skill: 3
    },
    {
        language: "Bootstrap",
        logo: "/logos/bootstrap.png",
        skill: 3
    }
]

export const backend: Lang[] = [
    {
        language: 'Node.JS',
        logo: '/logos/node.png',
        skill: 4
    }, 
    {
        language: "ExpressJS",
        logo: "/logos/express.png",
        skill: 4
    },
    {
        language: "MongoDB",
        logo: "/logos/mongo.png",
        skill: 4
    },
    {
        language: "Mongoose",
        logo: "/logos/mongoose.png",
        skill: 4
    },
    {
        language: "MySQL",
        logo: '/logos/mysql.png',
        skill: 2
    },
    {
        language: "ASP.NET",
        logo: '/logos/aspnet.jpg',
        skill: 1
    },
]
export const misc: Lang[] = [
    {
        language: "Visual Studio Code",
        logo: "/logos/vscode.png",
        skill: 4
    },
    {
        language: "Docker",
        logo: "/logos/docker.png",
        skill: 3
    },
    {
        language: "Git",
        logo: "/logos/git.png",
        skill: 4
    },
    {
        language: "Firebase",
        logo: "/logos/firebase.svg",
        skill: 4
    },
    {
        language: "GraphQL",
        logo: "/logos/graphql.png",
        skill: 3
    }
]