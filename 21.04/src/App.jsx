import { useState } from "react"
import Products from "./components/Products"
import Basket from "./components/Basket"
import './App.css'

export default function App() {

    const [products] = useState([
        { id: 101, title: "Design", price: 27, picture: "https://m.media-amazon.com/images/I/81gDywN3JFL._AC_UF894,1000_QL80_.jpg" },
        { id: 102, title: "Poetry", price: 21, picture: "https://m.media-amazon.com/images/I/91Mzoi3Z+RL._UF1000,1000_QL80_.jpg" },
        { id: 103, title: "Business", price: 47, picture: "https://i5.walmartimages.com/seo/DK-Big-Ideas-The-Business-Book-Big-Ideas-Simply-Explained-Paperback-9781465475886_a2601568-2767-4cc9-86b7-cbf3b1aa0a38.edd822cd8e88252ab8712dd4e14d4f43.jpeg" },
        { id: 104, title: "Literature", price: 17, picture: "https://images.booksense.com/images/015/491/9781465491015.jpg" },
        { id: 105, title: "Politics", price: 22, picture: "https://bookazine.com.hk/cdn/shop/products/ed07d7fa693fc323bddb394e163b257a.jpg?v=1589031076" },
        { id: 106, title: "Economics", price: 21, picture: "https://booksandyou.in/cdn/shop/files/TheEconomicsBook_1.webp?v=1732795447" },
        { id: 107, title: "JavaScript The Definitive Guide", price: 237, picture: "https://www.oreilly.com/covers/urn:orm:book:9781491952016/300w/" },
    ])

    const [basket, setBasket] = useState([])

    const handleMove = (product) => {

        const found = basket.find(prod => prod.id === product.id)
        if (found) {
            setBasket(basket.map(item =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ))
        } else {
            setBasket([...basket, { ...product, quantity: 1 }])
        }
    }

    const handleAdd = (id) => {
        const product = basket.find(t => t.id == id);
        if (product) {
            const cloned = { ...product };
            cloned.quantity++;
            setBasket([...basket.filter(t => t.id !== id), cloned]);
        }
    }

    const handleRemove = id => {
        setBasket(basket.filter(product => product.id !== id))
    }

    const handleRem = (id) => {
        const product = basket.find(t => t.id == id);
        if (product) {
            if (product.quantity === 1) {
                handleRemove(id);
                return
            }
            const cloned = { ...product };
            cloned.quantity--;
            setBasket([...basket.filter(t => t.id !== id), cloned]);
        }
    }

    return (
        <>
            <div className="container my-5">
                <h1 className="display-2 text-info">Bookshop</h1>
                <div className="row">
                    <Products products={products} onMove={handleMove} />
                    <Basket basket={basket} onRemove={handleRemove} onRem={handleRem} onAdd={handleAdd} />
                </div>
            </div>
        </>
    )
}