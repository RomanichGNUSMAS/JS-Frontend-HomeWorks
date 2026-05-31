export interface User {
    username:string,
    password?:string
}

export interface Post {
    id:number,
    authorid:number,
    title:string,
    description:string,
    postImage:string,
    createdAt:string,
    updatedAt:string,
    postInfo:Post,
}

export interface RegisterUser extends User {
    firstName:string,
    lastName:string,
    avatar:string,
}

export interface Account extends RegisterUser {
    id:number,
    bio:string,
    isAccountPrivate:boolean,
    followings: {receiver:Account}[],
    followers:{sender:Account}[],
    followersCount:number,
    followingsCount:number,
    posts:Post[]
}

export interface WholeRequest {
    followStatus: boolean,
    followsMe: boolean,
    requestSent: boolean,
    user: Account
}