export interface Product {
    id:number,
    price:number,
    title:string,
    author:string,
    photo:string,
    rating:number,
    comments:string[]
}

export interface Comment {
    id: number;
    author?: string;
    text: string;
    date: string;
    rating?: number;
};

export interface UserINFO {
    name:string,
    email:string,
    password:string
}

export interface PseudoProduct {
    id:number,
    price:number,
    title:string,
    author:string,
    photo:string,
}