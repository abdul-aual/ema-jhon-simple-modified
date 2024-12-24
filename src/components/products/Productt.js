import React from 'react';
import './productt.css';

const Productt = (props) => {
    const {key} = props.pdData;
    return (
        <div>
            <p>{key}</p>
        </div>
    );
};

export default Productt;