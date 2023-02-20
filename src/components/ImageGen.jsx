import React, { useState } from "react";
import Api from './api';
//require("dotenv").config();

function ImageGenerator() {
  const [input, setInput] = useState("");
  const [image, setImage] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${Api}`
        
        },
        body: JSON.stringify({ inputs: input }),
      }
    )
      .then((res) => res.blob())
      .then((blob) => {
        setImage(window.URL.createObjectURL(blob));
      });
  }

  function downloadImage() {
    const link = document.createElement("a");
    link.download = "generated-image.png";
    link.href = image;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  

  return (
    <div style={styles.container}>
        
        <p style={styles.katchou}>Katchou Verse</p>
      <form onSubmit={handleSubmit} style={styles.form} >
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} style={styles.input} placeholder="write your prompt here..." />
        <button type="submit" style={styles.button} >Generate</button>
        
      </form>
      
      

    <div>
       
          <div>
              <img src={image} style={styles.hello} alt="art" />
              <button onClick={downloadImage} style={styles.button} >Download Image</button>
          </div>
     
    </div>
    </div>
  
    
  );
};



const styles = {
    h1: {
     margin: 'auto',
     paddingLeft: 500,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    input: {
        height: 30,
        width: 200,
        marginRight: 10,
        padding:5,
        fontSize: 16,
    },
    button: {
        height: 40,
        width: 120,
        backgroundColor: 'lightblue',
        color: 'white',
        fontSize: 16,
        borderRadius: 5,
        border: 'none',
        cursor: 'pointer',
    },
    image: {
        height: 300,
        width: 300,
        objectifFit: 'contain',
        justifyContent: 'center',
    }, 
    hello: {
        height: 300,
        width: 300,
        objectifFit: 'contain',
        paddingLeft: 500,
    }, 
    katchou: {
        margin: 'auto',
        fontSize: 126,
    }
};

export default ImageGenerator;