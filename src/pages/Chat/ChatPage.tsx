import React, { useEffect, useState } from "react"
import { ChatMessageType } from "../../api/chat-api"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatchType, AppStateType } from "../../redux/redux-store"
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../redux/chat-reducer"
import noPic from '../../assets/images/noPic.jpg'




export const ChatPage: React.FC = () => {
    return <div>
        <Chat />
    </div>
}

const Chat: React.FC = () => {

    const dispatch: AppDispatchType = useDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div>
        <Messages />
        <AddMessageForm />
    </div>
}

const Messages: React.FC<{}> = () => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)

    return <div style={{ height: '500px', overflowY: 'auto' }}>
        {messages.map((m, index) => <Message key={index} message={m} />)}

    </div>
}



const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
 let userPhoto: string
    message.photo === null ? userPhoto = noPic : userPhoto = message.photo
    return <div>
        <div>
            <img src={userPhoto} style={{ width: '30px' }} alt='no img' />
            <b style={{ margin: '10px', display: 'inline-flex', justifySelf: 'center' }}>{message.userName}</b>
            <i style={{fontSize: '10px'}}>(User Id: {message.userId}) </i>
        </div>
        <br />
        {message.message}




        <hr />
    </div>
}

const AddMessageForm: React.FC<{}> = () => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    const dispatch: AppDispatchType = useDispatch()

    // useEffect(() => {
    //     let openHandler = () => {
    //         setReadyStatus('ready')
    //     }
    //     wsChannel?.addEventListener('open', openHandler)
    //     return () => {
    //         wsChannel?.removeEventListener('open', openHandler) // clean up
    //     }

    // }, [wsChannel])

    const sendMessageHandler = () => {
        if (!message) { return }

        dispatch(sendMessage(message))
        setMessage('')
    }
    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button disabled={false} onClick={sendMessageHandler}>Send</button>
        </div>
    </div>
}

