import React, { useState } from 'react';
import fakeData from '../fakedata/fakeData.json';
import Productt from './Productt';
const Products = () => {
    const first20 = fakeData.slice(0,20);
    const [products,setPro] =useState(
        first20.map((product)=>({
            ...product,
            clicked:false,
            quantity:0,
        }))
    );
    const handleClickBtn =(key)=>{
        const updateProducts = products.map((product)=>
        product.key === key? {...product,clicked:true,quantity:1}:product
        );
        setPro(updateProducts);
    }
    const inc = (key)=>{
        const incProduct = products.map((product)=>
            product.key === key ? {...product,quantity:product.quantity+1}:product
        );
        setPro(incProduct);
    }
    const dec = (key) =>{
        const decProduct = products.map(product=>
            product.key === key
                            ?
                             product.quantity>1?
                            {...product,quantity:product.quantity-1}:{...product,quantity:0,clicked:false}
                            :product
        );
        setPro(decProduct);
    }
    
    return (
        <div>
            {
                products.map((product,index)=>(
                    <Productt 
                    pdData={product} 
                    handleClickBtn={handleClickBtn}
                    inc={inc}
                    dec={dec}
                    key={index} ></Productt>
                ))
            }
        </div>
    );
};

export default Products;