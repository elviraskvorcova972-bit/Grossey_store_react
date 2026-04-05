import React, {use, useEffect, useState} from "react";
import styles from './Main.module.css';
import Header from "../../components/Header/Header";
import VegetableList from "../../components/VegetableList/VegetableList";
import Modal from "../../Modal/Modal/Modal";
import CartItem from "../../Modal/Modal/UI/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchVegetables } from "../../features/vegetables/vegetablesSlice";





function Main () {

    const [addedProductIds, setAddedProductIds] = useState<{ id: number; quantity: number }[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatchEvent(fetchVegetables())
        // fetch('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json')
        //     .then(res => {
        //         if(!res.ok) throw new Error('Ошибка сети');
        //         return res.json();
        //     })
        //     .then((data: Product[]) => {
        //         setAllProducts(data);
        //         setLoading(false);
        //     })
        //     .catch((err) => {
        //         setError(err.message);
        //         setLoading(false);
        //     })
    }, [])

    if (loading) return <p>Загрузка...</p>
    if (error) return <p>Ошибка: {error}</p>

    const totalCount = addedProductIds.reduce((sum, item) => sum + item.quantity, 0);

    const cartItems = addedProductIds.map(({id, quantity}) => {
        const product = allProducts.find(p => p.id === id);
        return product ? {...product, quantity} : null;
    }).filter(Boolean) as (Product & {quantity: number}) [];

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity, 0);

    return (
        <div>
            <Header 
                addedProductIds={addedProductIds}
                onCartClick={() => setIsModalOpen(true)} 
                totalCount={totalCount}
            />
            <VegetableList 
                allProducts={allProducts}
                addedProductIds={addedProductIds} 
                setAddedProductIds={setAddedProductIds}
            />
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {cartItems.length === 0 ? (
                    <p>Корзина пуста</p>
                ) : (
                    <div>
                        {cartItems.map(item => (
                            <CartItem
                            key={item.id}
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity}
                            image={item.image}
                            onIncrement={() => {
                                setAddedProductIds(prev => 
                                    prev.map(i => 
                                        i.id === item.id ? {...i, quantity: i.quantity + 1} : i
                                    )
                                )
                            }}
                            onDecrement={() => {
                                setAddedProductIds(prev => 
                                    prev.map(i => 
                                        i.id === item.id ? {...i, quantity: i.quantity - 1} : i
                                    )
                                    .filter(i => i.quantity > 0)
                                )
                            }}
                            />
                        ))}
                        <div className={styles.mainPrice}>
                            <h3>Total</h3>
                            <span>{totalPrice.toFixed(2)} $</span>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default Main;