import './cart.css';
import logo from '../images/logo.png';
import { useEffect, useState } from 'react';

const Cart = () => {
   
    const [cart, setCart] = useState(null);
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || { TotalItems: 0, TotalAmount: 0, Items: [] };
        setCart(storedCart);
    }, []);
    

    const toggleClass = () => {
        const divClass = document.getElementById('expandable-div');
        divClass.classList.toggle('expanded');
        divClass.classList.toggle('collapse');
    };

    const clearCart = () => {
        localStorage.removeItem('cart');
        setCart({ TotalItems: 0, TotalAmount: 0, Items: [] });
        alert('Cart has been cleared!');
    };
    if (cart === null) {
        return <div>Loading...</div>; 
    }
    const TotalAmount = parseFloat(cart?.TotalAmount || 0).toFixed(2);

    return (
        <div id='expandable-div' className='collapse'>
            <div className='collapse-content' onClick={toggleClass}>
                <div className='item-div'>
                    <h5>{cart.TotalItems} Items</h5> 
                </div>
                <div className='logo-div'>
                    <img src={logo} alt="Logo" />
                </div>
                <div className="total-amount-div">
                    <h5>{TotalAmount}</h5>
                </div>
            </div>
            <div className='expandable-content'>
                <button className='cross-btn' onClick={toggleClass}>&times;</button>
                <div className="scrollable-content">
                    <button onClick={clearCart} >Clear the Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
