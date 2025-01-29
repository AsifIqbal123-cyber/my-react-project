import React from 'react';
import image1 from '../assets/Customdesign.png';
import image2 from '../assets/selectiondesign.png';


const Home = () =>{
    
    
    
    return (<div>
        <div style={{position:'absolute', top:'10%', left:'5%'}}>
            <h4>Featured Categories</h4>
            <hr></hr>
        </div>

        <div style={{display:'flex', alignItems:'center', justifyContent:'center', gap: '45%'}}>
            <div>
                <div>
                <a href="/custome">
                <img src={image1} style={{width:'200px'}}/>
                <h4>Customized Design</h4>
                </a>
                </div>
            </div>
            <div>
                <div>
                <a href='/selection'>    
                <img src={image2}  style={{width:'200px'}} />
                <h4>Selection Design</h4>
                </a>
                </div>
            </div>
            <div>
                <div>
                <a href='/personalize'>
                <h4>Personal Design</h4>
                </a>
                </div>
            </div>
            <div>
                <div>
                <a href='/theme'>
                <h4>Theme Design</h4>
                </a>
                </div>
            </div>
        
        </div>

        <div>
        <h4>Shop for the Season!</h4>
        <hr></hr>
        </div>

    </div>)


};

export default Home;