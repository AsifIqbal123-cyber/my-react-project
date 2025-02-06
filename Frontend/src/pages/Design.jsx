import React from "react";
import '../components/style.css';
import { useState, useEffect } from "react";
import mensVNeck from '../assets/mens_v_neck.webp';
import design_1 from '../images/design_1.png';
import imagepool from '../images.js';
import TextEditor from '../components/add_text.jsx';





const imagesDirectory = '../images';

const Design = () => {
    const [product,setProduct] = useState(
        {name: localStorage.getItem('selectedSpecificType')|| null,
        image: mensVNeck,});
    const [isVisible,setVisible] = useState(false);
    
    const [popDesign,setpopDesign] = useState(null)
    const [designPopupVisible,setDesignPopupVisible]=useState(false);
    const [design,setDesign]=useState(null);
    const [textbox, setTextBox] =useState(false);
    const [uploadbox,setUploadBox] =useState(false);
    const [text,setText]=useState("")

    const handleDesignSelect =(selectedDesign) => {
        setDesign(selectedDesign);
        setDesignPopupVisible(false);
    }

    const clearDesign =() =>{
        setDesign(null);
        setDesignPopupVisible(false);
    }

    const handleData = (data) => {
        setText(data);
    };

    const closeTextEditor=()=>{
        setTextBox(false);
    };
  

    return (
        <div className="design_container">
            <div className="dashboard" >
                <button className="product" onClick={()=>setVisible(!isVisible)} >Choose a product</button>
                <br />
                <button className="design" onClick={()=>setDesignPopupVisible(!designPopupVisible)}>Choose a design</button>
                <br />
                <button className="text" onClick={()=>setTextBox(!textbox)}>Add a text</button>
                <br />
                <button className="image" onClick={()=>setUploadBox(!uploadbox)}>Upload an image</button>

                <div className="product_title">
                {isVisible&&(<div className="product_title">
                    <h2>Product - {product.name}</h2>
                    <img src={product.image}/></div>)}
               

                {design && (
                    <div className="selected_design">
                        <img src={design} alt="Selected Design"/>
                    </div>
                )
                }

                {text && (<div className="overlay_text">{text}</div>)}

                {uploadbox &&(
                    <div className="uploadbox"><h2>Hello</h2></div>
                )}

                </div>



                {designPopupVisible && (<div className="popup"> 
                                            <div className="popup_content">
                                                
                                                <h2>Choose Your Design <br/></h2>
                                                
                                                <button onClick={()=> setDesignPopupVisible(!designPopupVisible)}>Close <br/></button>     
                                                

                                                <div>
                                                    {imagepool.map((src, index) => (
                                                        <button key={index} onClick={() => handleDesignSelect(src)}>
                                                            <img src={src} alt={`Design ${index + 1}`} style={{ width: "100px", margin: "10px" }} />
                                                        </button>
                                                    ))}
                                                </div>
                                                
                                                <p><button onClick={()=> clearDesign()}>Clear Design</button></p>
                                                <p>{design && (
                                                <>
                                                <h2>Design choosen</h2><img src={design} alt="selected Design" style={{width:"100px",margin:"10px"}}/>
                                                </>
                                                )}<br/></p>   
                                            
                                            </div>
                                        </div>)}

                {textbox && (
                        <TextEditor onSendData={handleData} closeTextEditor={closeTextEditor} />
                    )}

       
                    
                    
            </div>  
        </div>
    );
};

export default Design;