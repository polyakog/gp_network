import React, { useEffect, useRef, useState } from "react"
import { ChatMessageAPIType } from "../../api/chat-api"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatchType, AppStateType } from "../../redux/redux-store"
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../redux/chat-reducer"
import noPic from '../../assets/images/noPic.jpg'
import css from './ChatPage.module.css'
import { Link } from "react-router-dom"




export const ChatPage: React.FC = () => {
    return <div>
        <Chat />
    </div>
}

const Chat: React.FC = () => {

    const dispatch: AppDispatchType = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)


    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return <div>
        {status === 'error' && <div>Error. Please reload the page</div>}
        <>
            <Messages />
            <AddMessageForm />
        </>

    </div>
}

const Messages: React.FC<{}> = () => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        var element = e.currentTarget
        if (Math.abs((element.scrollHeight-element.scrollTop) - element.clientHeight)<300){
            !isAutoScroll && setIsAutoScroll(true)            
        } else {
            isAutoScroll && setIsAutoScroll(false) 
        }
    }
    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return <div style={{ height: '500px', overflowY: 'scroll' }} onScroll={scrollHandler}>
        {messages.map((m, index) => <Message key={m.id} message={m} />)}
        <div ref={messagesAnchorRef}></div>
    </div>
}



const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({ message }) => {
    let userPhoto: string
    message.photo === null ? userPhoto = noPic : userPhoto = message.photo
    console.log('>>>>>>>>>Messages')
    return <div>
        <div>
            <img src={userPhoto} style={{ width: '30px' }} alt='no img' />
            <b style={{ margin: '10px', display: 'inline-flex', justifySelf: 'center' }}>{message.userName}</b>
            <i style={{ fontSize: '10px' }}>(User Id: {message.userId}) </i>
        </div>
        <br />
        {message.message}
        <hr />
    </div>
})

const AddMessageForm: React.FC<{}> = () => {
    const [message, setMessage] = useState('')
    const dispatch: AppDispatchType = useDispatch()
    const status = useSelector((state: AppStateType) => state.chat.status)

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
            <button className={css.buttonSend} disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
            <Link to="/settings" > 
            <button className={css.buttonSettings} >...</button> {/* добавить: настройку autoscroll, кол-во messagesLoaded (import messagesLoaded from chat-reducer)*/} 
            </Link>
            
        </div>
    </div>
}

