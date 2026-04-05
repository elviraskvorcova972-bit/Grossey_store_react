import React from "react";
import styles from './CartItem.module.css';
import minus from '../../../assets/minus-button.svg';
import plus from '../../../assets/plus-button.svg';

interface CartItemProps {
    name: string;
    price: number;
    quantity: number;
    image: string;
    onIncrement: () => void;
    onDecrement: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
    name, price, quantity, image, onIncrement, onDecrement
}) => {
    return (
        <div className={styles.cartItem}>
            <div className={styles.cartDetails}>
                <img src={image} alt={name} className={styles.cartImage} />
                <div className={styles.cartItemName}>
                    <h3>{name}</h3>
                    <span>{price} $</span>
                </div>
            </div>
            <div className={styles.cartItemCal}>
                <button onClick={onDecrement} disabled={quantity === 0}>
                    <img src={minus} alt="minus" className={styles.cartItemMinus} />
                </button>
                <h1>{quantity}</h1>
                <button onClick={onIncrement}>
                    <img src={plus} alt="plus" className={styles.CartItemPlus} />
                </button>
            </div>
        </div>
    )
}

export default CartItem;