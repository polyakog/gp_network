import React from "react";
import css from "./Settings.module.css"

const Settings = () => {
    return (
        <div>
            <h2>Settings</h2>
            <p>Global Settings</p> 
            <button className={css.settingsConnection} onClick = {()=> ( window.alert("your settings is saved"))}>ok</button>
        </div>

    )
}

export default Settings;