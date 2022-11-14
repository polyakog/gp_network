import React, { useState } from "react";
import css from './ProfileInfo.module.css';


const ProfileStatusWithHook = (props)=> {
    // let state = {
    //     editMode: false,
    //     // status: "---"
    //     status: props.status
    // }
    
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);
   
    


    let activeteEditMode = () => {
        
        setEditMode(true) 
    }

    let deactiveteEditMode = () => {
        setEditMode(false)
    }

    let saveState = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    }

    let onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

        return (

            <div >

                {!editMode &&
                    <div className={css.UserStatus + " " + css.active}>
                        {/* info from API-> Global State */}
                        <span onDoubleClick={activeteEditMode}>{props.status || 'No status'}</span>
                    </div>
                }


                {editMode &&
                    <div >
                        {/* info from Local State */}
                        <textarea className={css.UserStatus} onChange={onStatusChange} autoFocus={true} value={status} />
                        <div className={css.status}>
                            <button onClick={deactiveteEditMode}>Cancel <i >&#10554;</i></button>
                            <button onClick={saveState}>Save <i >&#10173;</i></button>
                        </div>


                    </div>
                }

            </div>
        );
    }

export default ProfileStatusWithHook;