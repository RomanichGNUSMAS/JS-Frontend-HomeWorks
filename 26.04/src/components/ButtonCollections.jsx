export default function ButtonCollections({setHandler,setQuests}) {
    return (
        <div className="buttonCollections">
            <button onClick={() => setQuests([])}>Delete All</button>
            <button onClick={() => setHandler(false)}>Revert All</button>
            <button onClick={() => setHandler(true)}>Complete All</button>
        </div>
    )
}