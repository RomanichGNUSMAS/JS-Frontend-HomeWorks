export interface ToDo {
    id: number,
    title : string,
    completed: boolean
}

export interface ContextType {
    ToDos: ToDo[]
    onDel: (id:number) => void,
    onChange:(id:number) => void,
    onAdd: (e:React.FormEvent) => void
}