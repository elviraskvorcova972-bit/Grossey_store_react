import React, {useState, useEffect} from "react";
import styles from './Header.module.css';
import cozina from '../../assets/corzina.svg';

interface HeaderProps {
    addedProductIds: {id: number; quantity: number}[];
    onCartClick: () => void;
    totalCount: number;
}

function Header ({addedProductIds, onCartClick, totalCount }: HeaderProps) {
    return (
        <header className={styles.header}>
            <h1 className={styles.header__title}>
            Vegetable <span>SHOP</span>
            </h1>
            <button className={styles.btn__header} onClick={onCartClick}>
                Cart ({totalCount})
                <img src={cozina} alt="cart" className={styles.cartIconCorzina}/>
            </button>
        </header>
    )
}

export  default Header;