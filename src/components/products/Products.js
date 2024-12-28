//     const dec = (key) => {
//         const selectedProduct = products.find((product)=>product.key === key);
//         const decProduct = products.map(product =>
//             product.key === key
//                 ?
//                 product.quantity > 1 ?
//                     { ...product, quantity: product.quantity - 1 } : { ...product, quantity: 0, clicked: false }
//                 : product
//         );
//         setPro(decProduct);

//             //this is for cart
      
//         setCart((preVcart)=>{
//             const updatedItems = preVcart.Items.map((item)=>
//             item.key === key ? {...item,quantity:item.quantity-1}:item
//             ).filter((item)=>item.quantity>0);
//             return{
//                 // TotalItems:updatedItems.length,
//                 TotalItems:updatedItems.reduce((total,item)=>total+item.quantity,0),
//                 TotamAmount:preVcart.TotamAmount - selectedProduct.price,
//                 Items:updatedItems,
//             };
//         });
//     };



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

    const [cart, setCart] = useState({ TotalItems: 0, TotamAmount: 0, Items: [] });

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
                TotamAmount: prevCart.TotamAmount + selectedProduct.price,
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
                TotamAmount: prevCart.TotamAmount + selectedProduct.price,
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
    
            const newTotamAmount = itemToRemove
                ? prevCart.TotamAmount - (itemToRemove.quantity * selectedProduct.price)
                : prevCart.TotamAmount - selectedProduct.price;
    
            return {
                TotalItems: updatedItems.length, // Update total unique items
                TotamAmount: Math.max(0, Math.round(newTotamAmount * 100) / 100), // Ensure no negative or floating-point precision issues
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
