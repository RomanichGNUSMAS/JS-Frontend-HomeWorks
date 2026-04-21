export default function BasketTr({item,onRemove,onAdd,onRem}) {
    return (
        <tr key={item.id}>
            <td>{item.title}</td>
            <td>{item.price} USD</td>
            <td>{item.quantity}</td>
            <td>{item.price * item.quantity} USD</td>
            <td>
                <button className="btn btn-outline-success mx-1" onClick={() => onAdd(item.id)} >+</button>
                <button className="btn btn-outline-dark mx-1" onClick={() => onRem(item.id)}>-</button>
                <button onClick={() => onRemove(item.id)} className="btn btn-outline-danger mx-1">x</button>
            </td>
        </tr>
    )
}