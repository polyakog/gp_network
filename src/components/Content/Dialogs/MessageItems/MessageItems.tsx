import React from 'react';
import css from './../Dialogs.module.css';
import { MessageItemsType, PhotosType } from '../../../../types/types';
import { AppDispatchType, AppStateType } from '../../../../redux/redux-store';
import { useDispatch, useSelector } from 'react-redux';
import noPhoto from '../../../../assets/images/noPic.jpg'

import { CheckCircleTwoTone, DeleteTwoTone, DislikeTwoTone, InteractionTwoTone } from '@ant-design/icons';





type PropsType = {
    contactPhoto: PhotosType | undefined
    deleteMessage: (messageId: string, delSpamMessage: MessageItemsType) => void
    spamMessage: (messageId: string, delSpamMessage: MessageItemsType) => void
    restoreMessages: (messageId: string) => void
    showMessages: () => void
        // addDeletedMessage: (delSpamMessage: MessageItemsType) => void
    
    component: string
}

const MessageItem: React.FC<PropsType & MessageItemsType> = ({ contactPhoto, deleteMessage, spamMessage,
    restoreMessages, showMessages, component, ...message }) => {

    const myId = useSelector((state: AppStateType) => state.auth.userId)
    const myPhoto = useSelector((state: AppStateType) => state.auth.userPhoto)
    const dispatch: AppDispatchType = useDispatch()
    

    let addedAtDate = message.addedAt.split('T')[0]
    let addedAtTime = message.addedAt.split('T')[1].slice(0, 5)

    let userPhoto: string = noPhoto
    if (contactPhoto) {
        if (contactPhoto.small !== null) userPhoto = contactPhoto.small
    }
    let ownerPhoto: string = noPhoto
    if (myPhoto) { ownerPhoto = myPhoto }


    const onDeleteClicked = () => {
        message.status = 'deleted'
        deleteMessage(message.id, message)
        dispatch(showMessages())
        console.log('message deleted', message.id, 'status:', message.status)

        // addDeletedMessage(message)

    }
    const onSpamClicked = () => {
        message.status = 'spam'
        spamMessage(message.id, message)
        dispatch(showMessages())
        console.log('message spammed', message.id)

        // addDeletedMessage(message)
    }

    const onRestoreClicked = () => {
        message.status = ''
        restoreMessages(message.id)
        dispatch(showMessages())
        console.log('message restored', message.id)


    }


    return (
        <div >
            <div className={css.message + ' ' + ((myId === message.senderId) ? css.green : css.grey)}>

                <div className={css.messagePhoto + ' ' + ((myId === message.senderId) ? css.greenPhoto : css.greyPhoto)}>
                    <img src={myId === message.senderId
                        ? ownerPhoto
                        : userPhoto
                    } alt='avatar' />
                </div>
                <div className={css.messageStatus + ' ' + ((myId === message.senderId) ? css.green : css.grey)}>
                    <p>{message.status}</p>
                </div>

                <div className={css.userNameAtMessage}> {message.senderName}</div>
                <p>{message.id}</p>
                {message.body}
                <div className={css.messageDate}> {addedAtDate} @  {addedAtTime}</div>

                {myId === message.senderId &&
                    <div className={css.viewedMessage}>{message.viewed
                        ? <CheckCircleTwoTone twoToneColor="#52c41a" />
                        : <CheckCircleTwoTone twoToneColor="grey" />
                    }
                    </div>
                }

                <div className={css.deletedMessage + ' ' + ((myId === message.senderId) ? css.green : css.grey)}>
                    {component === 'messages'
                        ? <div>
                            <button onClick={onDeleteClicked} data-hint="Delete message">
                                <DeleteTwoTone style={{ fontSize: '20px' }} />
                            </button>
                            <button onClick={onSpamClicked} data-hint="Spam message">
                                <DislikeTwoTone twoToneColor="#eb2f96" style={{ fontSize: '20px' }} />
                            </button>
                        </div>
                        :
                        <div>
                            <button onClick={onRestoreClicked} data-hint="Restore message">
                                <InteractionTwoTone style={{ fontSize: '20px' }} />
                            </button>
                        </div>
                    }




                </div>


            </div>
        </div>
    )
}

export default MessageItem;