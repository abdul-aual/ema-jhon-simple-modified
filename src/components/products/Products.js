import React, { useState } from 'react';
import fakeData from '../fakedata/fakeData.json';
import Productt from './Productt';
const Products = () => {
    const first10 = fakeData.slice(0,20);
    const [products] =useState(first10);
    return (
        <div>
            {
                products.map((product,index)=>(
                    <Productt pdData={product} key={index} ></Productt>
                ))
            }
        </div>
    );
};

export default Products;