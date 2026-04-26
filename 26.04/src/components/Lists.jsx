import ToDoItem from "./ToDoItem"

export default function Lists({ quests = {}, handleCancel, handleComplete, handleDelete }) {
    return (
        <div className="lists">
            <ul>
                {
                    quests.map((t) => {
                        return (
                            <ToDoItem key={t.id}
                                toDo={t}
                                handleCancel={handleCancel}
                                handleComplete={handleComplete}
                                handleDelete={handleDelete}
                            />
                        )
                    }
                    )
                }
            </ul>
        </div>
    )
}