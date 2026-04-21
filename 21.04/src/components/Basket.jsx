import BasketThead from "./basketAssets/BasketThead"
import BasketTbody from "./basketAssets/BasketTbody"

export default function Basket({ basket = [], onRemove, onAdd,onRem }) {
    return (
        <div className="col-md-5">
            <h2>Basket</h2>
            <table className="table table-bordered table-striped">
                <BasketThead />
                <BasketTbody basket={basket} onRemove={onRemove} onRem={onRem} onAdd={onAdd} />
            </table>
        </div>
    )
}