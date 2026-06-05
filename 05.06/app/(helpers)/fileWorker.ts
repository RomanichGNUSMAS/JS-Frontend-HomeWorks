"use server";
import fs from 'node:fs/promises';
import { User } from '../(types)/types';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export const getAllUsers = async () => {
   return JSON.parse(await fs.readFile('./data.json',{ encoding:"utf-8" }));
} 

export const addNewUser = async (message:string,body:FormData) => {
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
    await fs.writeFile('./data.json',JSON.stringify(users,null,2));
    return redirect('/');
}

export const removeUser = async (message:string,id:number) => {
    const users:User[] = await getAllUsers();
    const newUsers = users.filter(user => user.id !== id);
    if(users.length == newUsers.length) {
        return 'user not found'
    }
    await fs.writeFile('./data.json',JSON.stringify(newUsers,null,2));
    revalidatePath('/')
    return 'success';
}

export const updateUser = async (message:string,data:FormData) => {
    const users:User[] = await getAllUsers();
    const obj = Object.fromEntries(data);
    for(let i = 0;i < users.length;++i) {
        if(users[i].id == +obj.id!) {
            users[i] = {
                ...users[i],...obj,id:users[i].id
            }
            await fs.writeFile('./data.json',JSON.stringify(users,null,2));
            return 'updated';
        }
    }
    return 'user not found';
}