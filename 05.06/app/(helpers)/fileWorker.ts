"use server";
import fs from 'node:fs/promises';
import { User } from '../(types)/types';

export const getAllUsers = async () => {
   return JSON.parse(await fs.readFile('./data.json',{ encoding:"utf-8" }));
} 

export const addNewUser = async (body:FormData) => {
    if(!body.get('name') || !body.get('surname') || !body.get('salary')) {
        return 'please fill all fields';
    }
    const users:User[] = await getAllUsers();
    users.push({
        id:Date.now(),
        name:body.get('name')!.toString(),
        surname:body.get('surname')!.toString(),
        salary:Number(body.get('salary'))
    });
    return 'success'
}

export const removeUser = async (message:string,id:number) => {
    const users:User[] = await getAllUsers();
    const newUsers = users.filter(user => user.id !== id);
    if(users.length == newUsers.length) {
        return 'user not found'
    }
    await fs.writeFile('./data.json',JSON.stringify(newUsers));
    return "success";
}

export const updateUser = async (message:string,id:number,data:Partial<User>) => {
    const users:User[] = await getAllUsers();
    for(let i = 0;i < users.length;++i) {
        if(users[i].id == id) {
            users[i] = {
                ...users[i],...data,id:users[i].id
            }
            await fs.writeFile('./data.json',JSON.stringify(users));
            return 'updated';
        }
    }
    return 'user not found';
}