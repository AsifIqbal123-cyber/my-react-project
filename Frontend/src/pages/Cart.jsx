import React from "react";
import { useLocation } from "react-router-dom";

const Cart = () => {
    const location = useLocation();
    const { design, text, product } = location.state || {};

    return (
        <>        
        <div style={{ width: '70vw', height:'100vh', paddingTop:'20px', marginLeft:'-20%'}}>
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent:'flex-start',alignItems: 'center', marginTop: '40px' }}>
                <h1 style={{ margin: '0 20px 0 0' }}>Shopping Cart</h1>
                <button>Deselect all items</button>
            </div>

            {/* Table Section */}
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', marginTop: '20px' }}>
                <table style={{ borderCollapse: 'collapse', width: '100%',border:'solid black 2px' }}>
                    <thead style={{border:'black 2px solid'}}>
                        <tr>
                            <th style={{ padding: '10px', textAlign: 'center' }}>Product</th>
                            <th style={{ padding: '10px', textAlign: 'center' }}>Design</th>
                            <th style={{ padding: '10px', textAlign: 'center' }}>Text</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ padding: '10px' }}>
                                {product ? (
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
                                {design ? (
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
                                <h2>{text || "No text added."}</h2>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Uploaded Content Section */}
            {/* {design && (
                <div style={{ marginTop: '40px' }}>
                    <h1>Uploaded Image</h1>
                    <img src={design} alt="Uploaded Design" style={{ width: "150px" }} />

                    <h1>Uploaded Text</h1>
                    <h2>{text || "No text added."}</h2>

                    <h1>Product</h1>
                    {product ? (
                        <img
                            src={product.image}
                            alt="Selected Product"
                            style={{ width: "150px" }}
                        />
                    ) : (
                        <p>No product selected.</p>
                    )}
                </div>
            )} */}
        </div>
        </>

    );
};

export default Cart;
