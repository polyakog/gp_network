
let ws: WebSocket | null
let subscribers = {
    'messages-recieved': [] as MessagesRecievedSubcriberType[],
    'status-changed': [] as StatusChangedSubcriberType[]
}


const closeHandler = () => {
    console.log('Closing WebSocket')
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers['messages-recieved'].forEach(m => m(newMessages))
}

const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}
const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('GP: RELOAD PAGE')
}

const cleanUp = () => {
    ws?.removeEventListener('message', messageHandler) // clean up
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers["status-changed"].forEach(s => s(status))
    // console.log (`status: ${status}`)
}

function createChannel() {
    cleanUp()
    // ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx') // создаем канал
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('close', closeHandler) // подписка на канал
    ws?.addEventListener('message', messageHandler)
    ws?.addEventListener('open', openHandler) 
    ws?.addEventListener('error', errorHandler) 

   


}

export let chatAPI = {

    start() {
        createChannel()
    },

    stop() {
        subscribers["messages-recieved"]=[]
        subscribers["status-changed"] = []
        cleanUp()
        // ws?.close()
    },

    subscribe(eventName: EventNamesType, callback: MessagesRecievedSubcriberType | StatusChangedSubcriberType) {
        //@ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            //@ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback) //deleted callback
        }
    },

    unsubscribe(eventName: EventNamesType, callback: MessagesRecievedSubcriberType | StatusChangedSubcriberType) {
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback) //deleted callback
    },

    
    sendMessage(message: string) {
        ws?.send(message)
    },

}


export type MessagesRecievedSubcriberType = (messages: ChatMessageAPIType[]) => void
export type StatusChangedSubcriberType = (status: StatusType) => void

type EventNamesType = 'messages-recieved' | 'status-changed'

export type StatusType = 'pending' | 'ready' | 'error'

export type ChatMessageAPIType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}