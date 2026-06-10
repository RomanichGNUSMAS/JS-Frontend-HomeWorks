import { Action, User } from "./types";

export const reducer = (state: User[], Action: Action) => {
    switch (Action.type) {
        case "GOTREQUEST": {
            if (typeof Action.payload !== 'number')
                return Action.payload;
        }

        case "UPDATE": {
            if (typeof Action.payload !== 'number') {
                const updatedUser = Action.payload[0] as User
                return [...state.filter(user => user.id != updatedUser.id)]
            }
            return state;
        }

        case "ADD": {
            if (typeof Action.payload !== 'object') return state;
            return [...state, Action.payload[0]]
        }
        case "DELETE": {
            if (typeof Action.payload !== 'number') return state
            return state.filter(user => user.id != Action.payload)
        }
        default: {
            return state
        }
    }
}

