import React from 'react';
import './cart.css';
import logo from '../images/logo.png';

const Cart = () => {
    const toggleClass = () => {
        const divClass = document.getElementById('expandable-div');
        divClass.classList.toggle('expanded');
        divClass.classList.toggle('collapse');
    };
    const clearCart = () =>{
        localStorage.removeItem('cart');
        alert('Cart has been cleared!');
    };
    return (
        <div id='expandable-div' className='collapse'>
            <div className='collapse-content' onClick={toggleClass}>
                <div className='item-div'><h5>11 item</h5></div>
                <div className='logo-div'>  <img src={logo} alt="" />  </div>
                <div className='total-amount-div'><h5>$ 12323</h5></div>
            </div>
            <div className='expandable-content'>
                <button className='cross-btn' onClick={toggleClass}>&times;</button>
                <div className="scrollable-content">

                    <p>Lorem ipsum dom quos velit aut porro ducimus minima officia recusandae modi expedita rerum caut porro ducimus minima officia recusandae modi expedita rerum consequuntur obcaecati.</p>
                    <button onClick={clearCart}>Clear the Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
