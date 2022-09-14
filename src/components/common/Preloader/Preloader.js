import preloader from './../../../assets/Preloader/preloader5.gif';
import React from 'react';
import css from '../../Content/Users/Users.module.css'



let Preloader = () => {
    console.log('preloader')
    return (
        <div className={css.main}>
       <h2>Users</h2> 
    <img src={preloader} /> 
     </div>   
    
    
    )
}

export default Preloader;