export interface User {
    username:string,
    password?:string
}

export interface RegisterUser extends User {
    firstName:string,
    lastName:string,
    avatar:string,
}

export interface Account extends RegisterUser {
    bio:string,
    isAccountPrivate:boolean,
    followings:Account[],
    followers:Account[]
}
