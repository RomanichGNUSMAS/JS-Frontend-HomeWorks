export default function ToDoItem({toDo,handleDelete,handleCancel,handleComplete}) {
    return (
        <div>
            <li>{toDo.title}<br></br>
                <p>{toDo.completed + ''}</p></li>
            {
                !toDo.completed &&
                <button onClick={() => handleComplete(toDo.id)}>Complete</button>
            }

            <button onClick={() => handleCancel(toDo.id)}>Cancel</button>
            <button onClick={() => handleDelete(toDo.id)}>Delete</button>
        </div>
    )
}