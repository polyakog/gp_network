
let ws: WebSocket | null
let subscribers = [] as SubcriberType[]

const closeHandler = () => {
    console.log('Closing WebSocket')
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}

function createChannel() {
    ws?.removeEventListener('close', closeHandler) // отписка от канала
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx') // создаем канал
    ws.addEventListener('close', closeHandler) // подписка на канал
    ws?.addEventListener('message', messageHandler)
}

export let chatAPI = {

    start() {
        createChannel()
    },

    stop() {
        subscribers = []
        ws?.removeEventListener('message', messageHandler) // clean up
        ws?.removeEventListener('close', closeHandler)
        ws?.close()
    },

    subscribe(callback: SubcriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },

    unsubscribe(callback: SubcriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    },

    sendMessage(message: string) {
        ws?.send(message)
    },

}


export type SubcriberType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}