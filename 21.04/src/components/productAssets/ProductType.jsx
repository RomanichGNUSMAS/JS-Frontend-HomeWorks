export default function ProductType({ product,onMove }) {
    return (
        <div className="col-md-4 my-4">
            <img
                className="img-thumbnail"
                width={200}
                src={product.picture}
            />
            <p>{product.title}</p>
            <p className="text-danger">
                <strong>{product.price} USD</strong>
            </p>
            <button onClick={() => onMove(product)} className="btn btn-outline-dark">move</button>
        </div>
    )
}