import BasketTr from "./BasketTr"

export default function BasketTbody({ basket = [],onRemove,onAdd,onRem}) {
    return (
        <tbody>
        {
            basket.map((item,i) =>
                <BasketTr key={i} id={i} item={item} onRemove={onRemove} onRem={onRem} onAdd={onAdd} />
            )
        }
    </tbody>
    )
}