import React from "react";
import '../components/style.css';
import { useState, useEffect } from "react";
import mensVNeck from '../assets/mens_v_neck.webp';
import design_1 from '../assets/design_1.png'

const Design = () => {
    const [product,setProduct] = useState(
        {name: localStorage.getItem('selectedSpecificType')|| null,
        image: mensVNeck,});
    const [isVisible,setVisible] = useState(false);
    
    const [popDesign,setpopDesign] = useState(null)
    const [designPopupVisible,setDesignPopupVisible]=useState(false);
    const [design,setDesign]=useState(null);


    const handleDesignSelect =(selectedDesign) => {
        setDesign(selectedDesign);
        setDesignPopupVisible(false);
    }

    const clearDesign =() =>{
        setDesign(null);
        setDesignPopupVisible(false);
    }

    return (
        <div className="design_container">
            <div className="dashboard" >
                <button className="product" onClick={()=>setVisible(!isVisible)} >Choose a product</button>
                <br />
                <button className="design" onClick={()=>setDesignPopupVisible(!designPopupVisible)}>Choose a design</button>
                <br />
                <button className="text">Add a text</button>
                <br />
                <button className="image">Upload an image</button>
                <div className="product_title">
                {isVisible&&(<div className="product_title">
                    <h2>Product - {product.name}</h2>
                    <img src={product.image}/></div>)}
                    <p className="logo">{design && (<img src={design} alt="selected Design"/>)}</p>
                </div>

                {designPopupVisible && (<div className="popup"> 
                                            <div className="popup_content">
                                                
                                                <h2>Choose Your Design <br/></h2>
                                                
                                                <button onClick={()=> setDesignPopupVisible(!designPopupVisible)}>Close <br/></button>     
                                                

                                                <p><button onClick={() => handleDesignSelect(design_1)}><img src={design_1} alt="design_1" /></button> <br/></p>
                                                
                                                <p><button onClick={()=> clearDesign()}>Clear Design</button></p>
                                                <p>{design && <img src={design} alt="selected Design"/>}<br/></p>   
                                            </div>
                                        </div>)}
            </div>


            
        </div>
    );
};

export default Design;