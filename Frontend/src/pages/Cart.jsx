import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";


const Cart = () => {
    const location = useLocation();
    const { design, text, product } = location.state || {};

    const [orders, setOrders] = useState([]);


    useEffect(()=> {
        const fetchOrders = async () =>{
            try{
                const response = await fetch("http://localhost:8000/api/orders/");
                if (!response.ok) throw new Error ("Failed to fetch orders");
                const data = await response.json();
                const transformedOrders = data.map((order)=>({
                    id: order.id,
                    product: {
                        name: order.product_name,
                        image: order.product_image,
                    },
                    design: order.design_image || "",
                    text: order.custom_text || "",
                    isSelected: false,
                    quantity: order.quantity,
                    isChecked: true,
                }));
                setOrders(transformedOrders);
                
            } catch (error){
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    },[]);

 
 
 
 

    const toggleSelect = (id)=>{
        setOrders((prevOrders)=>
        prevOrders.map((order)=>
            order.id===id ? {...order, isSelected: !order.isSelected}:order
        ));
    };


    const handleQuantityChange = (id,value)=>{
        if (value >=1){
            setOrders((prevOrders)=>
                prevOrders.map((order)=>
                    order.id===id ? {...order, quantity: Number(value)} : order    
          ));
        }
    };

    const handleCheckboxChange = (id) =>{
        setOrders((prevOrders)=>
            prevOrders.map((order)=> {
               if (order.id===id) {
                const updatedOrder = {...order, isChecked: !order.isChecked};

                if(!order.isChecked){
                    console.log(updatedOrder);
                    //saveOrderToBackend(updatedOrder);
                }

                return updatedOrder;
            }
            return order;
        })
        );
    };

    const deleteOrder = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/orders/${id}/`, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log(`Order with ID ${id} deleted successfully`);
                setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
            } else {
                console.error("Failed to delete order from backend");
            }
        } catch (error) {
            console.error("Error deleting order:", error);
        }
    };


    const addOrder = ()=>{
        const newOrder = {
            id: orders.length +1,
            product,
            design,
            text,
            isSelected: false,
            quantity:1,
            isChecked: false,
        };
        saveOrderToBackend(newOrder);

        // setOrders((prevOrders)=>[...prevOrders,newOrder]);
    };

    const urlToFile = async (url,filename, mimeType)=>{
        const response = await fetch(url);
        const blob = await response.blob();
        return new File([blob], filename, {type:mimeType});
    };

    const saveOrderToBackend = async (order) => {
        try {

            console.log("Product Image Type:", typeof order.product.image);
            console.log("Design Image Type:", typeof order.design);

            const formData = new FormData();
            formData.append("product_name",order.product.name);

            const productImageFile = await urlToFile(order.product.image,"product_image.webp","image/webp");
            formData.append("product_image", productImageFile);


            if (order.design){
                const designImageFile = await urlToFile(order.design,"design_image.png","image/png");
                formData.append("design_image", designImageFile);
            } 

            formData.append("custom_text", order.text || "");
            formData.append("quantity", order.quantity);

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

    const image_product_retrieve = (order) => {
        if (order.product.image.startsWith("http")){
            return order.product.image;
        }
        return `http://localhost:8000${order.product.image}`;
    };

    const image_design_retrieve = (order) => {
        
        if (order.design.startsWith("http")){
            return order.design;
        }
        return `http://localhost:8000${order.design}`;
    };



    return (
        <>
        <div style={{ width: '70vw', height:'100vh', paddingTop:'20px', marginLeft:'-20%'}}>
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent:'flex-start',alignItems: 'center', marginTop: '40px' }}>
                <h1 style={{ margin: '0 20px 0 0' }}>Shopping Cart</h1>
                <button onClick={addOrder}>Add Another Order</button>
            </div>

            {/* Table Section */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '20px' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%',border:'solid black 2px' }}>
                    <thead style={{border:'black 2px solid'}}>
                        <tr>
                            <th style={{ padding: '10px', textAlign: 'center' }}>Product</th>
                            <th style={{ padding: '10px', textAlign: 'center' }}>Design</th>
                            <th style={{ padding: '10px', textAlign: 'center' }}>Text</th>
                            <th style={{ padding: '10px', textAlign: 'center', border:'solid 2px black' }}>Order quantity</th>
                            <th style={{ padding: '10px', textAlign: 'center', border:'solid 2px black' }}>Select</th>

                        </tr>
                        <tr>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order)=> (
                                <tr key={order.id}>
                                    <td style={{ padding: '10px' }}>
                                        {order.product ? ( 

                                        <img
                                            src={image_product_retrieve(order)}
                                            alt="Selected Product"
                                            style={{ width: "150px" }}
                                        />
                                        ) : (
                                        "No product selected."
                                        )}
                                    </td>
                                
                                    <td style={{ padding: '10px' }}>
                                        {order.design ? (
                                        <img
                                            src={image_design_retrieve(order)|| ""}
                                            alt="Uploaded Design"
                                            style={{ width: "150px" }}
                                        />
                                        ) : (
                                        "No design uploaded."
                                        )}
                                    </td>

                                    <td style={{ padding: '10px' }}>
                                        <h2>{order.text || "No text added."}</h2>
                                    </td>
                                    
                                    <td style={{ padding: "10px", border: "2px solid black" }}>

                                        <label style={{ marginLeft: "10px" }}>
                                            Quantity:
                                            <input
                                                type="number"
                                                value={order.quantity ?? 1}
                                                onChange={(e) => handleQuantityChange(order.id, e.target.value)}
                                                min="1"
                                                style={{ marginLeft: "10px", padding: "5px" }}
                                            />
                                        </label>
                                    </td>
                                    <td>
                                        <div style={{ marginTop: "10px" }}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={order.isChecked}
                                                    onChange={() => handleCheckboxChange(order.id)}
                                                />
                                                Confirm Order
                                            </label>
                                            <button onClick={()=>deleteOrder(order.id)} style={{ color: "red" }}>Delete Order</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


        </div>
        </>

    );
};

export default Cart;
