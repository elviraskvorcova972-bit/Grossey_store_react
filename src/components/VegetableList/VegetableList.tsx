import React, {useState, useEffect } from "react";
import styles from "./VegetableList.module.css";
import cozina from '../../assets/corzina_two.svg';
import minus from '../../assets/minus-button.svg';
import plus from '../../assets/plus-button.svg';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface VegetableListProps {
  allProducts: Product[];
  addedProductIds: {id: number; quantity: number} [];
  setAddedProductIds: React.Dispatch<React.SetStateAction<{id: number;
  quantity: number}[]>>;
}

const VegetableList: React.FC<VegetableListProps> = ({ allProducts,
  addedProductIds, setAddedProductIds }) => {

    const addToCart = (id: number) => {
      setAddedProductIds(prev => {
        const found = prev.find(item => item.id === id);
        if (found) {
          return prev.map(item => 
            item.id === id ? {...item, quantity: item.quantity + 1} : item
          );
        }
        return [...prev, {id, quantity: 1}];
      });
    };

    const incrementQuantity = (id: number) => {
      setAddedProductIds(prev => 
        prev.map(item =>
          item.id === id ? {...item, quantity: item.quantity + 1} : item
        )
      );
    };

    const decrementQuantity = (id: number) => {
      setAddedProductIds(prev =>
        prev.map(item =>
          item.id === id ? {...item, quantity: Math.max(item.quantity - 1, 0)} : item
        )
        .filter(item => item.quantity > 0)
      );
    };

  return (
    <div className={styles.vegetable}>
      <h1 className={styles.vegetable_title}>
        Catalog
      </h1>
        <section className={styles.vegetable_list}>
          {allProducts.map(veg => {
            const cartItem = addedProductIds.find(item => item.id === veg.id);
            const quantity = cartItem ? cartItem.quantity : 0;
            return (
              <article key={veg.id} className={styles.vegetable_card}>
                <img src={veg.image} alt={veg.name} className={styles.vegetable_image}/>
              <div className={styles.cartInfo}>
               <h3 className={styles.vegetable_name}>{veg.name}</h3>
                <div className={styles.iconChetchick}>
                  <button onClick={() => decrementQuantity(veg.id)} disabled={quantity === 0}>
                    <img src={minus} alt="minus" className={styles.cartIconMinus}/>
                  </button>
                  <h1>{quantity}</h1>
                  <button onClick={() => incrementQuantity(veg.id)}>
                    <img src={plus} alt="plus" className={styles.cartIconPlus}/>
                  </button>
                </div>
              </div>
              <div className={styles.cartInfoPrice}>
                <span className={styles.vegetable_price}>{veg.price} $</span>
                <button className={styles.btn_vegetable} onClick={() => addToCart(veg.id)}>
                  <h1>Add to cart</h1>
                  <img src={cozina} alt="cart" className={styles.cartIconCorzina}/>
                </button>
              </div>
            </article>
            )
          })}
        </section>
    </div>
 
  );
};

export default VegetableList;
