import { User } from "./types";

export const allUsers = async () => {
    const result = await fetch('http://localhost:3000/users/all');
    return result.json();
}

export const addUser = async (userBody:User) => {
    const result = await fetch('http://localhost:3000/users/add', {
        method:"POST",
        body: JSON.stringify(userBody)
    });
    const data = result.json();
    return data;
}

export const removeUser = async (id:number) => {
    const result = await fetch(`http://localhost:3000/users/remove/${id}`, {
        method:"DELETE"
    })
    const data = result.json();
    return data;
}

export const updateUser = async (id:number,userData:Partial<User>) => {
    const result = await fetch(`http://localhost:3000/update/${id}`, {
        method:"PUT",
        body: JSON.stringify(userData)
    })
}
