import { useEffect, useState } from "react"
import { Product } from "./Product"
import style from "./ProductContainer.module.css"


export const ProductContainer = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {

        const URL = "https://68c0d8310b196b9ce1c5276b.mockapi.io/products"
        const fetchData = async () => {
            const res = await fetch(URL)
            const data = await res.json()
            setProducts(data)
        }

        fetchData()

    }, []
    )


    return (
        <div className={style.gridContainer}>
            {products.map(
                product => (
                    <Product
                        key={product.id}
                        name={product['product-name']}
                        description={product['product-description']}
                    />
                )
            )}
        </div>
    )

}