import React from "react";
import "./ItemDetailContainer.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { db } from '../..//firebase/firebase';
import { getDoc, collection, doc } from 'firebase/firestore';

import Spinner from "../Spinner/Spinner";
import ItemCount from "../ItemCount/ItemCount";
import { CartContext } from "../../context/CartContext";




export function ItemDetailContainer() {
  const { addItem } = useContext(CartContext)
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const onAdd = (cantidad) => {
    addItem({ ...product, quantity: cantidad })
  }

  useEffect(() => {
    const productosCollection = collection(db, 'items');
    const refDoc = doc(productosCollection, id);
    getDoc(refDoc)
      .then(result => {
        const producto = {
          id: result.id,
          ...result.data()
        }
        setProduct(producto);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="spinner">
          <Spinner />
        </div>
      ) : (
        <div className="container d-flex mt-5 justify-content-center align-items-center">
          <div className="row">
            <div className="col-md-12 mt-5">
              <div className="card text-center bg-dark">
                <img src={product.image} alt="" className="card-img-top" />
                <div className="card-body text-light">
                  <h4 className="card-title">{product.title}</h4>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">Precio: {product.price} USD</p>
                  <ItemCount initial={1} stock={product.stock} onAdd={onAdd} />
                  <button><Link to={`/`} className="atras fs-4"> Atrás </Link></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
