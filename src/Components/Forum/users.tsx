
interface User {
    username: string,
    name: string,
    avatar?: string,
    signature?: string,
    joinDate: Date
}

export default class Users implements User {
    readonly joinDate: Date
    readonly username: string
    name: string
    avatar: string
    signature: string
    private static userlist: Users[] = []
    online: boolean;
    constructor(username: string, name: string = "", avatar: string = "https://i.ytimg.com/vi/S3jNNspN9jE/maxresdefault.jpg", signature: string = "", joinDate: Date = new Date(new Date().getTime() + 5183154011797)) {
        this.avatar = avatar;
        this.name = name;
        this.signature = signature;
        this.username = username;
        this.joinDate = joinDate
        this.online = Math.random() > 0.5
        Users.userlist.push(this)
    }
    static all() {
        return this.userlist
    }
    getPosts() {
        return Posts.all().filter(p => p.author == this)
    }
}

interface Post {
    content: string,
    author: Users,
    date: Date
    likes?: Users[]
}

export class Posts {
    content: string;
    readonly author: Users;
    readonly date: Date;
    likes: Users[] = [];
    quotes: Posts[] = []
    readonly id: string
    static postlist: Posts[] = [];
    constructor (content: string, author: Users, date: Date) {
        this.content = content;
        this.author = author;
        this.date = date;
        Posts.postlist.push(this)
        this.id = `${this.date.getTime()}${Math.random()*1000}`
    }
    static all() {
        return this.postlist
    }
    likeBy(u: Users) {
        this.likes.push(u);
    }
    unlikedBy(u: Users) {
        this.likes = this.likes.filter(user => user != u)
    }
}
function rtu(q: string) {return Users.all().find(user => user.username == q)}

const postlist: Post[] = [
    {
        author: rtu('N7Admin')!,
        content: "Welcome to the Omni-tool. Remember to read the rules. We hope you enjoy your stay!",
        date: new Date(2183, 1, 1),
        likes: Users.all()
    }
]


export const userlist: User[] = [
    {
        username: "Commander",
        name: "Shepard",
        avatar: "https://i.imgur.com/7okyoXB.jpg",
        signature: "I should go.",
        joinDate: new Date(2183, 6, 6)
    },
    {
        username: "dave420",
        name: "Admiral David Anderson",
        avatar: "https://i.imgur.com/MTkT0vw.jpg",
        joinDate: new Date(2183, 1, 1)
    },
    {
        username: "Joker",
        name: "Jeff Moreau",
        avatar: "https://i.imgur.com/aozBikB.jpg",
        signature: "I swear I didn't plug in the overlord",
        joinDate: new Date(2183, 4, 9)
    },
    {
        username: "ash2183",
        name: "Ashley Williams",
        avatar: "https://i.imgur.com/7oSAp7I.png",
        joinDate: new Date(2183, 8, 16)
    },
    {
        username: "KAlenko",
        name: "Kaiden Alenko",
        avatar: "https://i.imgur.com/YXnaq6b.jpg",
        joinDate: new Date(2183, 7, 1)
    },
    {
        username: "Eva",
        name: "EDI",
        avatar: "https://i.imgur.com/BswDoZC.jpg",
        signature: "I enjoy seeing humans on their knees",
        joinDate: new Date(2184, 4, 21)
    },
    {
        username: "ShepsBFF",
        name: "Garrus Vakarian",
        avatar: "https://i.imgur.com/XX8MUQa.jpg",
        signature: "I'm doing some calibrations",
        joinDate: new Date(2183, 11, 11)
    },
    {
        username: "taliZ",
        name: "Tali'Zorah nar Rayya",
        avatar: "https://i.imgur.com/Gl4zRHD.jpg",
        signature: "Keelah Se'lai",
        joinDate: new Date(2183, 9, 27)
    },
    {
        username: "shadow_broker",
        name: "Liara T'soni",
        avatar: "https://i.imgur.com/rhVvw3Y.jpg",
        signature: "By the Goddess",
        joinDate: new Date(2183, 9, 19)
    },
    {
        username: "battletoad",
        name: "Urdnot Wrex",
        avatar: "https://i.imgur.com/67ipHnx.jpg",
        signature: "I'mma headbutt the person who made this forum software",
        joinDate: new Date(2183, 10, 11)
    },
    {
        username: "perfect",
        name: "Miranda Lawson",
        avatar: "https://i.imgur.com/6jJuVjF.jpg",
        joinDate: new Date(2184, 6, 17)
    },
    {
        username: "JT",
        name: "Jacob Taylor",
        avatar: "https://i.imgur.com/hynqray.jpg",
        joinDate: new Date(2184, 7, 28)
    },
    {
        username: "science_guy",
        name: "Mordin Solus",
        avatar: "https://i.imgur.com/932R7sn.jpg",
        signature: "I am the very model of a scientist Salarian",
        joinDate: new Date(2184, 10, 5)
    },
    {
        username: "platform_2A93",
        name: "Legion",
        avatar: "https://i.imgur.com/S7lkzkK.jpg",
        signature: "Geth don't use windows. They are a structural weakness",
        joinDate: new Date(2184, 11, 11)
    }, 
    {
        username: "jack",
        name: "jack",
        avatar: "https://i.imgur.com/5eWuGjI.jpg",
        joinDate: new Date(2184, 9, 13)
    }, 
    {
        username: "Justicar",
        name: "Samara",
        avatar: "https://i.imgur.com/u3sOvJR.jpg",
        joinDate: new Date(2184, 10, 4)
    },
    {
        username: "thane",
        name: "Thane Krios",
        avatar: "https://i.imgur.com/d4VYZUs.jpg",
        joinDate: new Date(2185, 1, 17)
    },
    {
        username: "grunt",
        name: "Grunt",
        avatar: "https://i.imgur.com/yfmwXGS.jpg",
        signature: "I AM KROGAN",
        joinDate: new Date(2184, 11, 19)
    }, 
    {
        username: "John_Smith",
        name: "Kasumi Goto",
        avatar: "https://i.imgur.com/9POOAp9.jpg",
        joinDate: new Date(2185, 2, 15)
    },
    {
        username: "Z",
        name: "Zaeed Masani",
        avatar: "https://i.imgur.com/DfjiznV.jpg",
        joinDate: new Date(2185, 3, 21)
    }, 
    {
        username: "new_guy",
        name: "James Vega",
        avatar: "https://i.imgur.com/uR23K3f.jpg",
        signature: "Loco",
        joinDate: new Date(2185, 10, 19)
    }, 
    {
        username: "Javik",
        name: "Javik",
        avatar: "https://i.imgur.com/R4ZMRbG.jpg",
        signature: "I am surrounded by primitives",
        joinDate: new Date(2185, 11, 21)
    },
    {
        username: "Harby",
        name: "Harbinger",
        avatar: "https://wallpaperaccess.com/full/6253452.jpg",
        signature: "Trollin organics since da big bang 🤣🤣🤣",
        joinDate: new Date(2184, 1, 1)
    }, 
    {
        username: "N7Admin",
        name: "Cossie",
        avatar: "https://c4.wallpaperflare.com/wallpaper/95/447/613/mass-effect-n7-hd-wallpaper-preview.jpg",
        signature: "Webmaster, full-stack developer, gamer",
        joinDate: new Date(2183, 0, 1)
    }
]

userlist.forEach(user => {
    const {username, name, avatar, signature, joinDate} = user
    let newUser = new Users(username, name, avatar, signature, joinDate)
})

let hi = new Posts("Welcome to the N7 Communication Hub. Remember to read the rules. We hope you enjoy your stay!", rtu('N7Admin')!, new Date(2183,0,1))
hi.likes = hi.likes.concat(Users.all())

Users.all().forEach(u => {
    let content = "Hello, from " + u.username;
    let author = u;
    let date = u.joinDate
    let p = new Posts(content, author, date)
    p.likes = [rtu('N7Admin')!]
})