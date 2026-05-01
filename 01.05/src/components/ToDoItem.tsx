import React from "react"

type Props = {
    quest: string
    isComplete: boolean
    id?: number
    onDelete?: (id: number) => void
    onComplete?: (id: number) => void
}
export const ToDoItem: React.FC<Props> = ({ quest, isComplete, id, onDelete, onComplete }) => {
    return (
        <div>
            <h3>{quest}</h3>
            <p>{`${isComplete}`}</p>
            {

                (onDelete && onComplete) && (
                    [<button key={`complete-${id}`} onClick={() => onComplete(id)}>
                        {
                            Boolean(isComplete) ?
                                "Cancel" :
                                "Complete"
                        }
                    </button>,
                    <button key={`delete-${id}`} onClick={() => onDelete(id)}>
                        Delete
                    </button>]
                )
            }
        </div>
    )
}