import React from 'react';
import css from './../Dialogs.module.css';
import { MessageItemsType, PhotosType } from '../../../../types/types';
import { AppDispatchType, AppStateType } from '../../../../redux/redux-store';
import { useDispatch, useSelector } from 'react-redux';
import noPhoto from '../../../../assets/images/noPic.jpg'
import { formatDate } from '../../../common/Date/formatDate'
import { CheckCircleTwoTone, DeleteTwoTone, DislikeTwoTone, InteractionTwoTone } from '@ant-design/icons';






type PropsType = {
    contactPhoto: PhotosType | undefined
    deleteMessage: (messageId: string, delSpamMessage: MessageItemsType) => void
    spamMessage: (messageId: string, delSpamMessage: MessageItemsType) => void
    restoreMessages: (messageId: string) => void
    requestMessages: () => void
    componentType: string
}

const MessageItem: React.FC<PropsType & MessageItemsType> = React.memo(({ contactPhoto, deleteMessage, spamMessage,
    restoreMessages, requestMessages, componentType, ...message }) => {

    const myId = useSelector((state: AppStateType) => state.auth.userId)
    const myPhoto = useSelector((state: AppStateType) => state.auth.userPhoto)

    const dispatch: AppDispatchType = useDispatch()


    // let addedAtDate = message.addedAt.split('T')[0]
    // let addedAtTime = message.addedAt.split('T')[1].slice(0, 5)
    let formatedDate = formatDate(new Date(message.addedAt + 'Z'))



    let userPhoto: string = noPhoto
    if (contactPhoto) {
        if (contactPhoto.small !== null) userPhoto = contactPhoto.small
    }
    let ownerPhoto: string = noPhoto
    if (myPhoto) { ownerPhoto = myPhoto }


    const onDeleteClicked = () => {
        message.status = 'deleted'
        deleteMessage(message.id, message)
        requestMessages()
        console.log('message deleting', message.id, 'status:', message.status)
    }
    const onSpamClicked = () => {
        message.status = 'spam'
        spamMessage(message.id, message)
        requestMessages()
        console.log('message spamming', message.id)
    }

    const onRestoreClicked = () => {
        message.status = ''
        restoreMessages(message.id)
        requestMessages()
        console.log('message restoring', message.id)
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
                {/* <div className={css.messageDate}> {addedAtDate} @  {addedAtTime}</div> */}
                <div className={css.messageDate}>
                    {formatedDate}
                </div>

                {myId === message.senderId &&
                    <div className={css.viewedMessage}>{message.viewed
                        ? <CheckCircleTwoTone twoToneColor="#52c41a" />
                        : <CheckCircleTwoTone twoToneColor="grey" />
                    }
                    </div>
                }

                <div className={css.deletedMessage + ' ' + ((myId === message.senderId) ? css.green : css.grey)}>
                    {componentType === 'messages'
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
})

export default MessageItem;