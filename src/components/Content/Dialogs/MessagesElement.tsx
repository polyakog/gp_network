import React from 'react';
import MessageItem from './MessageItems/MessageItems';
import { MessageItemsType } from '../../../types/types';
import { PhotosType } from '../../../types/types';


export type MessagePropsType = {
    contactPhoto: PhotosType | undefined
    deleteMessage: (messageId: string, delMessage: MessageItemsType) => void
    spamMessage: (messageId: string) => void
    requestMessages: () => void
    restoreMessages: (messageId: string) => void
}

type PropsType = {
    messages: MessageItemsType[]
    componentType: string
    messageProps: MessagePropsType
}


export const MessagesElement: React.FC<PropsType> = ({ messages, componentType, messageProps }) => {


    let elements = messages.map(m => (
        <MessageItem
            key={m.id}
            id={m.id}
            body={m.body}
            translatedBody={m.translatedBody}
            addedAt={m.addedAt}
            senderId={m.senderId}
            senderName={m.senderName}
            recipientId={m.recipientId}
            viewed={m.viewed}
            deletedByRecipient={m.deletedByRecipient}
            deletedBySender={m.deletedByRecipient}
            isSpam={m.isSpam}
            recipientName={m.recipientName}
            status={m.status}
            componentType={componentType}
            contactPhoto={messageProps.contactPhoto}
            deleteMessage={messageProps.deleteMessage}
            spamMessage={messageProps.spamMessage}
            restoreMessages={messageProps.restoreMessages}
            requestMessages={messageProps.requestMessages}
        />
    ));

    return <div>{elements} </div>
}

