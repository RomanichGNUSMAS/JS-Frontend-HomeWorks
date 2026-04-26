export default function AddTodo({ handleAdd, setInputVal, inputVal, error }) {
    return (
        <div className="todoRegistry">
            <input
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                type="text"
                placeholder="write todo"
            />
            <button onClick={handleAdd}>ADD</button>
            {error && <p>{error}</p>}
        </div>
    )
}