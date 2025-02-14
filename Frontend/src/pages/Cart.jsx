import React from "react";
import Design from "./design";
import { useLocation } from "react-router-dom";

const Cart=() => {
    const location = useLocation();
    const {design,text,product} = location.state || {};

    return( 
        <div>
        <h1>Shopping Cart</h1>
        {design ? (
            <div>
                <h1>Uploaded Image</h1>
                <img src={design} alt="Uploaded Design" style={{ width: "150px", marginTop: "10px" }} />
                
                <h1>Uploaded Text</h1>
                <h2>{text || "No text added."}</h2>
                
                <h1>Product</h1>
                {product ? (
                    <img src={product.image} alt="Selected Product" style={{ width: "150px", marginTop: "10px" }} />
                ) : (
                    <p>No product selected.</p>
                )}
            </div>
        ) : (
            <p>No design uploaded.</p>
        )}
    </div>
    );
};

export default Cart;