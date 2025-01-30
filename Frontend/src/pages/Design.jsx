import React from "react";
import '../components/style.css';
import { useState,useEffect } from "react";





const Design = () => {
    const [product,setProduct] = useState(localStorage.getItem('selectedSpecificType')|| null);
    const [isVisible,setVisible] = useState(false);


    return (
        <div className="design_container">
            <div className="dashboard" >
                <button className="product" onClick={()=>setVisible(!isVisible)} >Choose a product</button>
                <br />
                <button className="design">Choose a design</button>
                <br />
                <button className="text">Add a text</button>
                <br />
                <button className="image">Upload an image</button>
                <div className="product_title">
                {isVisible&&<h2>Product - {product}</h2>}
                </div>
            </div>

            
        </div>
    );
};

export default Design;