import React, { useEffect, useState } from 'react';
import fakeData from '../fakedata/fakeData.json';
import Productt from './Productt';

const Products = () => {
    const first20 = fakeData.slice(0, 20);
    const [products, setPro] = useState(
        first20.map((product) => ({
            ...product,
            clicked: false,
            quantity: 0,
        }))
    );

    const [cart, setCart] = useState({ TotalItems: 0, TotalAmount: 0, Items: [] });

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            setCart(storedCart);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const handleClickBtn = (key) => {
        const selectedProduct = products.find((product) => product.key === key);
        const updatedProducts = products.map((product) =>
            product.key === key
                ? { ...product, clicked: true, quantity: 1 }
                : product
        );
        setPro(updatedProducts);

        setCart((prevCart) => {
            const existingItem = prevCart.Items.find((item) => item.key === key);
            const updatedItems = existingItem
                ? prevCart.Items
                : [...prevCart.Items, { ...selectedProduct, quantity: 1, clicked: true }];

            return {
                TotalItems: updatedItems.length,
                TotalAmount: prevCart.TotalAmount + selectedProduct.price,
                Items: updatedItems,
            };
        });
    };

    const inc = (key) => {
        const selectedProduct = products.find((product) => product.key === key);
        const updatedProducts = products.map((product) =>
            product.key === key
                ? { ...product, quantity: product.quantity + 1 }
                : product
        );
        setPro(updatedProducts);

        setCart((prevCart) => {
            const updatedItems = prevCart.Items.map((item) =>
                item.key === key
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            return {
                TotalItems: prevCart.TotalItems, // Total items remain unchanged
                TotalAmount: prevCart.TotalAmount + selectedProduct.price,
                Items: updatedItems,
            };
        });
    };

    const dec = (key) => {
        const selectedProduct = products.find((product) => product.key === key);
        const updatedProducts = products.map((product) =>
            product.key === key
                ? {
                    ...product,
                    quantity: product.quantity > 1
                        ? product.quantity - 1
                        : 0,
                    clicked: product.quantity > 1,
                }
                : product
        );
        setPro(updatedProducts);

        setCart((prevCart) => {
            const itemToRemove = prevCart.Items.find((item) => item.key === key && item.quantity === 1);

            const updatedItems = prevCart.Items.map((item) =>
                item.key === key
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ).filter((item) => item.quantity > 0);

            const newTotalAmount = itemToRemove
                ? prevCart.TotalAmount - (itemToRemove.quantity * selectedProduct.price)
                : prevCart.TotalAmount - selectedProduct.price;

            return {
                TotalItems: updatedItems.length, // Update total unique items
                TotalAmount: Math.max(0, Math.round(newTotalAmount * 100) / 100), // Ensure no negative or floating-point precision issues
                Items: updatedItems,
            };
        });
    };

    return (
        <div>
            {products.map((product, index) => (
                <Productt
                    pdData={product}
                    handleClickBtn={handleClickBtn}
                    inc={inc}
                    dec={dec}
                    key={index}
                ></Productt>
            ))}
        </div>
    );
};

export default Products;
