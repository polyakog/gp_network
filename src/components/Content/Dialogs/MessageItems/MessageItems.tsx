import React from 'react';
import css from './../Dialogs.module.css';
import userPhoto from '../../../../assets/images/noPic.jpg'

type PropsType = {
    name:string
    id:number
    text:string
}

const MessageItem: React.FC<PropsType> = (props) => {

    return (
        <div className={css.message}>
            <div >
                {/* <div className={({props.name}) => (props.name = "Gennadij" ? (css.message + " " + css.activeM) : css.message)}> */}


                <img src={userPhoto} alt="" />
                <span className={css.userMessage}> {props.name} (ID{props.id}): </span>
                <div>- {props.text} </div>

            </div>

        </div>
    )
}

export default MessageItem;