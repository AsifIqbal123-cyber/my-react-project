import React from "react";
import '../components/style.css';
import { useState, useEffect } from "react";
import mensVNeck from '../assets/mens_v_neck.webp';
import design_1 from '../images/design_1.png';
import imagepool from '../images.js';
import TextEditor from '../components/add_text.jsx';
import axios from "axios";
import {useNavigate} from 'react-router-dom';






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
    const [text,setText]=useState("");
    const [uploadedImage,setUploadedImage]=useState(null);
    const navigate = useNavigate();

    const user_data ={
        design:design,
        text:text,
        product:product,
    };


    useEffect(() => {
        setProduct({
            name: localStorage.getItem('selectedSpecificType') || null,
            image: mensVNeck,
        });
    }, []);

    const handleDesignSelect =(selectedDesign) => {
        setDesign(selectedDesign);
        setDesignPopupVisible(false);
    };

    const clearDesign =() =>{
        setDesign(null);
        setDesignPopupVisible(false);
    };

    const handleData = (data) => {
        setText(data);
    };

    const closeTextEditor=()=>{
        setTextBox(false);
    };

    const handleImageUpload= async(event)=>{
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file",file);
        try{
            const response = await fetch("http://localhost:8000/upload/", {
                method: "POST",
                body: formData,
                headers:{

                },
            });
        

        const data = await response.json();
   
        if (response.ok){
            const fullUrl = `${data.file_url}`
            console.log(fullUrl);
            setUploadedImage(file);
            setDesign(fullUrl);
            alert("File uploaded successfully!");
        } else {
            alert("Error: ${data.error}");
        }
    }catch(error){
        console.error("Upload error",error);
    }
    };

    const clearUpload =()=>{
        setUploadedImage(null);
        setUploadBox(false);
    };

    const saveImage=()=>{
        setDesign(uploadedImage)
        setUploadBox(!uploadbox);
    };

    const urlToFile = async (url,filename, mimeType)=>{
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], filename, {type:mimeType});
    };

    const saveOrderToBackend = async () => {
        try {

            const orderData = {
                id: Date.now(),
                product: {
                    name: product.name,
                    image: product.image,
                },
                design: design|| "",
                text: text || "",
                isSelected: false,
                quantity: 1,
                isChecked: true,
            }

            const formData = new FormData();
            formData.append("product_name", orderData.name);
            console.log

            const productImageFile = await urlToFile(orderData.image,"product_image.webp","image/webp");
            formData.append("product_image", productImageFile);


            if (orderData.design){
                const designImageFile = await urlToFile(orderData.design,"design_image.png","image/png");
                formData.append("design_image", designImageFile);
            } 

            formData.append("custom_text", orderData.text || "");
            formData.append("quantity", orderData.quantity);

            const response = await fetch ("http://localhost:8000/api/orders/", {
                method: "POST",
                body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Order saved successfully:", data);

        } else {
            console.error("Failed to save order");
        }
        }catch (error) {
            console.error("Error while saving order:", error);
        }
    };


    const sendCart=()=>{
        saveOrderToBackend();
        navigate('./cart',{state: user_data});
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
                
            </div>  

            <div className="functions" >

                {isVisible && (
                    <div className="product_title">
                        <h2>Product - {product.name}</h2>
                        <img src={product.image}alt="Selected Product"/>
                        {text && (
                            <div className="overlay_text" style={{display:"inline"}}>
                                {text}
                            </div>
                    )
                }
                    </div>)
                }
               
                {design && (
                    <div className="selected_design">
                        <img src={design} alt="Selected Design"/>
                    </div>)
                }

              

                {uploadbox && (
                    <div className="uploadbox">
                        <button onClick={clearUpload}>Close <br/></button>     
                        <h2 style={{color:"black"}}>Upload Your Image</h2>
                        <input type="file" accept="image/*" onChange={handleImageUpload} />

                        {uploadedImage && (
                            <div className="uploaded-image-preview">
                                <h3 style={{color:"black"}}>Preview:</h3>
                                <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded" style={{width:"150px", marginTop:"10px"}}/>
                                <br></br>
                                <button onClick={saveImage}>Upload</button>
                            </div>)
                        }
                    </div>
                    )}

                <button className="add_cart" onClick={sendCart}>Add to cart</button>
            </div>

                {designPopupVisible && (
                    <div className="popup"> 
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
                    </div>)
                }



                {textbox && (
                        <div className="TextEditor">
                            <TextEditor onSendData={handleData} closeTextEditor={closeTextEditor} />
                        </div>
                        )
                }

       
        </div>
    );
};

export default Design;