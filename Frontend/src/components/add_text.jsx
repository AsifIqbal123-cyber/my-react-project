import React,{useRef,useEffect, useState} from "react";
import "./style.css";

const add_text =() =>{
    const inputRef= useRef(null);

    useEffect(()=>{
        inputRef.current.focus();
    },[]);

    const applyFormat = (command)=>{
        document.execCommand(command,false,null);
    };

    const [text, setText]=useState("");

    const handleChange = (event)=>{
        setText(event.target.innerText);
    };

    return(
        <div className="editor-container">
            <div className="toolbar">
                <button onClick={()=> applyFormat('bold')}>Bold</button>
                <button onClick={()=> applyFormat('italic')}>Italic</button>
                <button onCanPlay={()=> applyFormat('underline')}>Underline</button>
                <button onClick={()=>{handleChange}}>Submit</button>
            </div>

            <div
                ref={inputRef}
                className="editor"
                contentEditable
                suppressContentEditableWarning={true}
            >
            {text}
            </div>
        </div>
    
    );
}; 
export default add_text;