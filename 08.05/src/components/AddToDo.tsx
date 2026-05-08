import React from "react";
import { ToDoContext } from "../context/Provider";

export const AddToDo: React.FC = function () {
    const [mail, setMail] = React.useState('');
    const context = React.useContext(ToDoContext);
    return (
        <form className="todoForm" onSubmit={e => {
            context.onAdd(e);
            setMail('');
        }}>
            <input
                className="todoForm__input"
                value={mail}
                placeholder="mail"
                onChange={e => setMail(e.target.value)}
            />
            <button className="todoForm__btn" type="submit">Send</button>
        </form>
    )
}