import React from 'react';
import css from './../Dialogs.module.css';
// import noPhoto from '../../../../assets/images/noPic.jpg'
import { MessageItemsType } from '../../../../types/types';

type PropsType = {

}

const MessageItem: React.FC<PropsType & MessageItemsType> = (props) => {
    // let avatarPhoto: string = noPhoto
    // if (props.photos.small) { avatarPhoto = props.photos.small }

    let addedAtDate = props.addedAt.split('T')[0]
    let addedAtTime = props.addedAt.split('T')[1].slice(0, 5)
    return (
        <div className={css.message}>
            <div >
                {/* <div className={({props.name}) => (props.name = "Gennadij" ? (css.message + " " + css.activeM) : css.message)}> */}


                {/* <img src={avatarPhoto} alt="" /> */}
                <span className={css.userNameAtMessage}> {props.senderName}</span>

                <div className={css.messageBody}>
                    {props.body}
                    <div className={css.messageDate}> {addedAtDate} @  {addedAtTime}</div>
                </div>

            </div>

        </div>
    )
}

export default MessageItem;