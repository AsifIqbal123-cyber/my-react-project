import React,{useRef,useEffect, useState} from "react";
import "./style.css";

const Addtext =({onSendData,closeTextEditor}) =>{
    const inputRef= useRef(null);
  
    const [textContent,setInitialText]=useState("");
    const text = useRef(textContent);
    text.current=textContent;

    useEffect(()=>{
        const savedText = localStorage.getItem("savedText");
        if (savedText){
            setInitialText(savedText);
        }
        inputRef.current.focus();
    },[]);

    const applyFormat = (command)=>{
        document.execCommand(command,false,null);
    };

    

    const handleChange = ()=>{
        text.current=inputRef.current.innerHTML;
    };
  

    const handleSave =()=>{
        localStorage.setItem("savedText",text.current);
        setInitialText(localStorage.getItem("savedText"));
    };

    const onload =()=>{
        console.log("text current :",text.current);
    };

   
    return(
        <div className="editor-container">
            <div className="toolbar">
                <button type="button" onClick={()=> applyFormat('bold')}>Bold</button>
                <button type="button" onClick={()=> applyFormat('italic')}>Italic</button>
                <button type="button" onClick={()=> applyFormat('underline')}>Underline</button>
                <button type="button" onClick={()=> onSendData(text.current)}>Submit</button>
                <button type="button" onClick={handleSave}>Save</button>
                <button type="button" onClick={onload}>Onload</button>
                <button type="button" onClick={closeTextEditor}>Close</button>
            </div>

            <div
                ref={inputRef}
                className="editor"
                contentEditable
                suppressContentEditableWarning={true}
                onInput={handleChange}
                dangerouslySetInnerHTML={{ __html: textContent}}
           />
        </div>
    
    );
}; 
export default Addtext;