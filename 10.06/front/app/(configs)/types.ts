export interface User {
    id:number,
    name:string,
    email:string,
    salary:number
}

export interface Action {
    type:string,
    payload: User[]
}