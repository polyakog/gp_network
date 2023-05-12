import React from 'react';
import css from './../Dialogs.module.css';
import { MessageItemsType, PhotosType } from '../../../../types/types';
import { AppStateType } from '../../../../redux/redux-store';
import { useSelector } from 'react-redux';
import noPhoto from '../../../../assets/images/noPic.jpg'

import { CheckCircleTwoTone, DeleteTwoTone, DislikeTwoTone } from '@ant-design/icons';




type PropsType = {
    contactPhoto: PhotosType | undefined
    deleteMessage: (messageId: string) => void
    spamMessage: (messageId: string) => void
    restoreDeletedSpamMessages: (messageId: string) => void
}

const MessageItem: React.FC<PropsType & MessageItemsType> = (props) => {

    const myId = useSelector((state: AppStateType) => state.auth.userId)
    const myPhoto = useSelector((state: AppStateType) => state.auth.userPhoto)


    let addedAtDate = props.addedAt.split('T')[0]
    let addedAtTime = props.addedAt.split('T')[1].slice(0, 5)

    let userPhoto: string = noPhoto
    if (props.contactPhoto) {
        if (props.contactPhoto.small !== null) userPhoto = props.contactPhoto.small
    }
    let ownerPhoto: string = noPhoto
    if (myPhoto) { ownerPhoto = myPhoto }

    const onDeleteClicked = () => {
        props.deleteMessage(props.id)
        console.log('message deleting', props.id)

    }
    const onSpamClicked = () => {
        props.deleteMessage(props.id)
        console.log('message spammed', props.id)
    }


    return (
        <div >
            <div className={css.message + ' ' + ((myId === props.senderId) ? css.green : css.grey)}>

                <div className={css.messagePhoto + ' ' + ((myId === props.senderId) ? css.greenPhoto : css.greyPhoto)}>
                    <img src={myId === props.senderId
                        ? ownerPhoto
                        : userPhoto
                    } alt='avatar' />
                </div>

                <div className={css.userNameAtMessage}> {props.senderName}</div>
                <p>{props.id}</p>
                {props.body}
                <div className={css.messageDate}> {addedAtDate} @  {addedAtTime}</div>
                {myId === props.senderId &&
                    <div className={css.viewedMessage}>{props.viewed
                        ? <CheckCircleTwoTone twoToneColor="#52c41a" />
                        : <CheckCircleTwoTone twoToneColor="grey" />
                    }
                    </div>
                }
                <div className={css.deletedMessage + ' ' + ((myId === props.senderId) ? css.green : css.grey)}>
                    <button onClick={onDeleteClicked} data-hint="Delete message">
                        <DeleteTwoTone style={{ fontSize: '20px' }} />
                    </button>
                    <button onClick={onSpamClicked} data-hint="Spam message">
                        <DislikeTwoTone twoToneColor="#eb2f96" style={{ fontSize: '20px' }} />
                    </button>

                </div>


            </div>
        </div>
    )
}

export default MessageItem;