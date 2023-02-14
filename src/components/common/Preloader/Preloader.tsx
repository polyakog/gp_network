import preloader from './../../../assets/Preloader/preloader1.gif';
import React from 'react';




let Preloader = (props) => {
    console.log(!props.message ? 'preloader' : props.message)
    return (
        <div >
         <img src={preloader} alt=''/> 
            
      </div>   
    
    
    )
}

export default Preloader;