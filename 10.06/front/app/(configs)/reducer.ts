import { Action, User } from "./types";

export const reducer = (state: User[],Action:Action) => {
    switch(Action.type) {
        case "GOTREQUEST": {
            if(typeof Action.payload !== 'number')
            return Action.payload;
        }
        
        case "UPDATE": {
            
        }
        default: {
            return state
        }
    }
}