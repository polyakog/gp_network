import React, { useEffect, useState } from "react"



export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

export const ChatPage: React.FC = () => {
    return <div>
        <Chat />
    </div>
}

const Chat: React.FC = () => {

    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            console.log('Closing WebSocket')
            setTimeout(createChannel, 3000)
        }

        function createChannel() {
            ws?.removeEventListener('close', closeHandler) // отписка от канала
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx') // создаем канал
            ws.addEventListener('close', closeHandler) // подписка на канал
            setWsChannel(ws)
        }
        createChannel()
        return () => {
            ws.removeEventListener('close', closeHandler) // clean up
            ws.close()
        }

    }, [])



    return <div>
        <Messages wsChannel={wsChannel} />
        <AddMessageForm wsChannel={wsChannel} />
    </div>
}

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        }

        wsChannel?.addEventListener('message', messageHandler)
        return () => {
            wsChannel?.removeEventListener('message', messageHandler) // clean up
        }

    }, [wsChannel])

    return <div style={{ height: '500px', overflowY: 'auto' }}>
        {messages.map((m, index) => <Message key={index} message={m} />)}

    </div>
}



const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {

    return <div>
        <div>
            <img src={message.photo} style={{ width: '30px' }} alt='avatar' />
            <b style={{ margin: '10px', display: 'inline-flex', justifySelf: 'center' }}>{message.userName}</b>
        </div>
        <br />
        {message.message}




        <hr />
    </div>
}

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready')
        }
        wsChannel?.addEventListener('open', openHandler)
        return () => {
            wsChannel?.removeEventListener('open', openHandler) // clean up
        }

    }, [wsChannel])

    const sendMessage = () => {
        if (!message) { return }
        wsChannel?.send(message)
        setMessage('')
    }
    return <div>
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
        </div>
        <div>
            <button disabled={wsChannel === null || readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
        </div>
    </div>
}

