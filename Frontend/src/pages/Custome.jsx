import React, {useEffect,useState} from "react";
import {useNavigate} from 'react-router-dom';

import '../components/style.css';

const Custome = () => {

    // const [clickedDiv, setClickedDiv] = useState(localStorage.getItem('clickedDiv') || null);

    const [selectedSexType, setSexType] = useState(localStorage.getItem('selectedSexType')||null);
    const [selectedClothesType,setClothesType]= useState(localStorage.getItem('selectedClothesType')|| null);
    const [selectedSpecificType,setSpecificType]=useState(localStorage.getItem('selectedSpecificType')||null);
    
  
    useEffect(()=> {
        localStorage.setItem('selectedSexType',selectedSexType);
        localStorage.setItem('selectedClothesType',selectedClothesType);
        localStorage.setItem('selectedSpecificType',selectedSpecificType);
    }, [selectedSexType,selectedClothesType,selectedSpecificType]);

    const navigate = useNavigate();

    const options = {
        Men: { 
          "Tee-shirts": ["Men's Crew Neck Tee", "Men's V-Neck Tee", "Men's Graphic Tee","Men's Graphic Tee","Men's Graphic Tee","Men's Graphic Tee","Men's Graphic Tee"],
          "Polo_shirts": ["Men's Classic Polo", "Men's Slim Fit Polo", "Men's Sport Polo"],
          "Sweatshirts": ["Men's Hoodie", "Men's Zip-Up Sweatshirt", "Men's Crew Sweatshirt"],
          "Shirts_sweaters": ["Men's Formal Shirt", "Men's Casual Shirt", "Men's Knit Sweater"],
          "Work": ["Men's Work Pants", "Men's High-Visibility Vest", "Men's Work Jacket"],
          "Sportswear": ["Men's Running Shorts", "Men's Gym Tank Top", "Men's Track Suit"],
          "Jackets_Coats": ["Men's Leather Jacket", "Men's Winter Coat", "Men's Rain Jacket"],
          "Home_textile": ["Men's Lounge Pants", "Men's Sleepwear Set", "Men's Robe"],
          "Underwear": ["Men's Boxer Briefs", "Men's Trunks", "Men's Thermal Underwear"],
          "Ethical_Fashion": ["Men's Organic Cotton Tee", "Men's Recycled Hoodie"]
        },
        Women: {  
          "Tee-shirts": ["Women's Casual Tee", "Women's Graphic Tee", "Women's Oversized Tee"],
          "Polo_shirts": ["Women's Classic Polo", "Women's Sporty Polo"],
          "Sweatshirts": ["Women's Cropped Sweatshirt", "Women's Oversized Hoodie"],
          "Shirts_sweaters": ["Women's Blouse", "Women's Cardigan", "Women's Knit Sweater"],
          "Work": ["Women's Blazer", "Women's Pencil Skirt", "Women's Work Pants"],
          "Sportswear": ["Women's Yoga Leggings", "Women's Sports Bra", "Women's Joggers"],
          "Jackets_Coats": ["Women's Parka", "Women's Denim Jacket", "Women's Trench Coat"],
          "Home_textile": ["Women's Pajama Set", "Women's Robe", "Women's Nightgown"],
          "Underwear": ["Women's Bikini Briefs", "Women's Lace Bra", "Women's Thermal Set"],
          "Ethical_Fashion": ["Women's Hemp Dress", "Women's Bamboo Tank Top"]
        },
        Kids: { 
          "Tee-shirts": ["Kids' Cartoon Tee", "Kids' Striped Tee", "Kids' Plain Tee"],
          "Polo_shirts": ["Kids' Polo Shirt - Boys", "Kids' Polo Shirt - Girls"],
          "Sweatshirts": ["Kids' Pullover Hoodie", "Kids' Zip-Up Hoodie"],
          "Shirts_sweaters": ["Kids' Flannel Shirt", "Kids' Knit Sweater"],
          "Work": ["Kids' Apron", "Kids' Play Costume"],
          "Sportswear": ["Kids' Soccer Jersey", "Kids' Basketball Shorts"],
          "Jackets_Coats": ["Kids' Raincoat", "Kids' Puffer Jacket", "Kids' Bomber Jacket"],
          "Home_textile": ["Kids' Pajamas", "Kids' Blanket Wrap"],
          "Underwear": ["Kids' Boxer Shorts", "Kids' Training Pants"],
          "Ethical_Fashion": ["Kids' Organic Cotton Tee", "Kids' Sustainable Hoodie"]
        },
        Accessories: {
          "Hats": ["Baseball Cap", "Beanie", "Sun Hat"],
          "Scarves": ["Wool Scarf", "Silk Scarf"],
          "Gloves": ["Leather Gloves", "Winter Mittens"],
          "Bags": ["Tote Bag", "Backpack", "Fanny Pack"],
          "Belts": ["Leather Belt", "Elastic Belt"],
          "Socks": ["Ankle Socks", "Knee-High Socks"]
        }
      };
      

    const specificoptions = selectedSexType && selectedClothesType ? options[selectedSexType][selectedClothesType] || [] : [];

    




    return (
   
        <div className="grid-container" style={{backgroundColor:'green'}}>
            <div className="clothes_option">
                <h3>Choose Type of Clothes</h3>
            <div className="sextype">
            {Object.keys(options).map((sexType)=> (
                <div 
                    key={sexType}
                    className={`clickable ${
                        selectedSexType ===sexType ? "clicked" :""
                    }`}
                    onClick={()=> setSexType(sexType)}
                >
                {sexType}
                </div>
            ))}
            </div>
            
        <br></br>
        <br></br>
        <h3>Choose Clothing Type</h3>
            <div className="clothestype">

                    {selectedSexType && (
                    <>
                     {Object.keys(options[selectedSexType]).map((clothe) => (
                        <div 
                            key={clothe}
                            className={`clickable ${
                                selectedClothesType === clothe ? "clicked" :""
                            }`}
                            onClick={()=> setClothesType(clothe)}
                        >
                            {clothe}
                        </div>
                     ))}
                    </>
                    )}
                </div>
                </div>

                
                <div className="clothes_selection">
                <h3>Options for {selectedSexType} - {selectedClothesType}</h3>
                    {selectedClothesType && selectedSexType && (
                     <>
                     <div className="selectclothes">           
                        {specificoptions.map((clothes,index)=>(
                        <div 
                            key={index}
                            className={`clickable ${
                              selectedSpecificType ===clothes ? "clicked":""   
                            }`}
                            onClick={()=> setSpecificType(clothes)}
                        >
                            {clothes}
                        </div>
                            ))}
                        </div>

                        </>       
                        )} 
                        <button className="redirect-button" onClick={()=>navigate('./Design')}>
                            Proceed to design
                        </button>
                </div>                   
            </div>
         )};
        export default Custome;
