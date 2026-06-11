import { User } from "./types";

export const allUsers = async () => {
    const result = await fetch('http://localhost:3001/users/all');
    return result.json();
}

export const addUser = async (userBody:Omit<User,'id'>) => {
    console.log(JSON.stringify(userBody))
    const result = await fetch('http://localhost:3001/users/add', {
        method:"POST",
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify(userBody)
    });
    const data = result.json();
    return data;
}

export const removeUser = async (id:number) => {
    const result = await fetch(`http://localhost:3001/users/remove/${id}`, {
        method:"DELETE"
    })
    const data = result.json();
    return data;
}

export const updateUser = async (id:number,userData:Partial<User>,email:string) => {
    const result = await fetch(`http://localhost:3001/users/update/${id}`, {
        method:"PUT",
        headers:{ 'Content-Type': 'application/json'},
        body: JSON.stringify({...userData,currentEmail:email})
    })

    const data = result.json();
    return data;
}
