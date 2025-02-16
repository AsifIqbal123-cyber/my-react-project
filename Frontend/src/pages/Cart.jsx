import React, {useState} from "react";
import { useLocation } from "react-router-dom";


const Cart = () => {
    const location = useLocation();
    const { design, text, product } = location.state || {};

    const [orders, setOrders]= useState ([
        {id:1, product,design,text, isSelected:false,quantity:1, isChecked:false},
    ]);


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
                    saveOrderToBackend(updatedOrder);
                }

                return updatedOrder;
            }
            return order;
        })
        );
    };

    const deleteorder = (id) => {
        setOrders((prevOrders)=>
            prevOrders.filter((order) => order.id !==id));
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
        setOrders([...orders,newOrder]);
    };

    const saveOrderToBackend = async (order) => {
        try {
            const response = await fetch ("http://localhost:8000/api/orders/", {
                method: "POST",
                headers: {
                    "Content-Type":" application/json",
                },
                body: JSON.stringify({
                    product_name: order.product.name,
                    product_image: order.product.image,
                    design_image: order.design || "",
                    custom_text: order.text || "",
                    quantity: order.quantity,
                }),
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
                                            src={product.image}
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
                                            src={design}
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
                                                value={order.quantity}
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
                                            <button onClick={()=>deleteorder(order.id)} style={{ color: "red" }}>Delete Order</button>
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
