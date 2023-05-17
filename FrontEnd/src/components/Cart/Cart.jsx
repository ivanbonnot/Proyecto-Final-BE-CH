import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import '../Cart/Cart.css'

const Cart = () => {

    const { removeItem, clear, totalCompra, productsCarrito } = useContext(CartContext);

    return (
        <>
            {productsCarrito.length === 0 ?
                <div className="noProduct">
                    <h3> ¡Tu carrito está vacío! </h3>
                    <button><Link to="/">Ir a compras</Link></button>
                </div>
                : <div className="product">
                    <h1 > Detalle de su carrito  </h1> {productsCarrito.map(item =>
                        <div key={item.id}>
                            <div className="detailContainer">
                                <h3 id={item.id}> {item.title}
                                    <button className="delete" onClick={() => removeItem(item.id)}>X</button></h3>
                                <p>Cantidad: {item.quantity}</p>
                                <p>Precio total: ${item.price * item.quantity}</p>
                            </div>
                        </div>
                    )}
                    <div className="total">Total Compra: $ {totalCompra()}</div>
                    <button className="buy"> <Link to={'/brief'}>Finalizar compra</Link></button>
                    <button className="clear" onClick={clear}> Limpiar carrito</button>
                </div>}
        </>
    )
}

export default Cart;
