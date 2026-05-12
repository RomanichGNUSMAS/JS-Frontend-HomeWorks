import type { User } from "../../types/contextType";
import type { Action } from "../../types/reducerTypes";

export default function reducer(state: User[], action: Action) {
    switch (action.type) {
        case "ADDUSER" : {
            const newUser = action.payload as User;
            const found = state.find(user => user.name === newUser.name);
            return found ? state : [...state, newUser];
        }
        case "DELETEUSER" : {
            const id = action.payload as number;
            return state.filter(user => user.id !== id);
        }
        case "SALARYUP" : {
            const id = action.payload as number;
            const found = state.find(user => user.id === id);
            if (found) {
                const newUser = { ...found, salary: found.salary + 5000 };
                return [...state.filter(user => user.id !== id), newUser];
            }
            return state;
        }

        case "SALARYDOWN" : {
            const id = action.payload as number;
            const found = state.find(user => user.id === id);
            if (found) {
                const salary = found.salary - 5000
                const newUser = { ...found, salary: salary < 0 ? 0 : salary - 5000 };
                return [...state.filter(user => user.id !== id), newUser];
            }
            return state;
        }
        default:
            return state;
    }
}
