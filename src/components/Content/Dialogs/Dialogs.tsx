import React, { useEffect, useState } from 'react';
import css from './Dialogs.module.css';
import DialogItem from './DialogItems/DialogItems';
import MessageItem from './MessageItems/MessageItems';
import AddMessageForm from '../../common/Forms/AddMessageForm';
import { InitialStateType } from '../../../redux/dialogs-reducer';
import { MessageItemsType } from '../../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { getDeletedMessages, getDialogs, getIsFetching, getMessages } from '../../../redux/dialogApi-selectors';
import { AppDispatchType } from '../../../redux/redux-store';
import { requestDialogs, showMessages, requestMessagesAfterDate } from '../../../redux/dialogsApi-reducer';
import Paginator from '../../common/Paginator/Paginator';
import { CloseCircleOutlined, SettingOutlined } from '@ant-design/icons';
import { PageNumberSetting } from '../../common/Paginator/PageNumberSettings';
import { PhotosType } from '../../../types/types';
import { MessageSearchForm } from './MessageSearchForm';
import Preloader from '../../common/Preloader/Preloader';



type PropsType = {
    dialogsPage: InitialStateType
    requestDialogs: () => void
    requestMessages: (userId: number, currentPage: number, pageSize: number, setTotalUsersCount: any) => void
    addMessage: (userId: number, newMessageText: string) => void
    deleteMessage: (messageId: string, delSpamMessage: MessageItemsType) => void
    spamMessage: (messageId: string) => void
    restoreMessages: (messageId: string) => void

}

export type NewMessageFormType = {
    newMessageText: string

}

export type SelectedUserType = {
    name: string
    userId: number
    photo: PhotosType
}



const Dialogs: React.FC<PropsType> = ({ addMessage, deleteMessage, spamMessage, restoreMessages }) => {

    const dialogs = useSelector(getDialogs)
    const messages = useSelector(getMessages)
    const deletedMessages = useSelector(getDeletedMessages)
    const [selectedUser, setSelectedUser] = useState<SelectedUserType | null>(null)
    const [isRestoredMessage, setIsRestoredMessage] = useState(false)
    const isFetching = useSelector(getIsFetching)

    const dispatch: AppDispatchType = useDispatch()


    /* Page Settings */
    const [totalCount, setTotalCount] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [pagesInput, setPageInput] = useState(false)


    const onPageChanged = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    const requestMessages = () => {

        if (!!selectedUser) {
            // showMessages(selectedUser.userId, currentPage, pageSize, setTotalCount)
            dispatch(showMessages(selectedUser.userId, currentPage, pageSize, setTotalCount))
        }
    }


    useEffect(() => {
        dispatch(requestDialogs())
    }, [])

    useEffect(() => {
        requestMessages()
    }, [selectedUser, totalCount, currentPage, pageSize])


    useEffect(() => {
        setCurrentPage(1)
    }, [pageSize, selectedUser, totalCount])


    let dialogElements = dialogs.map(d => (
        <DialogItem
            key={d.id}
            id={d.id}
            userName={d.userName}
            hasNewMessages={d.hasNewMessages}
            lastDialogActivityDate={d.lastDialogActivityDate}
            lastUserActivityDate={d.lastUserActivityDate}
            newMessagesCount={d.newMessagesCount}
            photos={d.photos}
            onUserSelected={setSelectedUser}
            selectedUser={selectedUser}
        />
    ))

    let messageElements = messages.map(m => (
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
            contactPhoto={selectedUser?.photo}
            deleteMessage={deleteMessage}
            spamMessage={spamMessage}
            restoreMessages={restoreMessages}
            deletedByRecipient={m.deletedByRecipient}
            deletedBySender={m.deletedByRecipient}
            isSpam={m.isSpam}
            recipientName={m.recipientName}

            status={m.status}
            requestMessages={requestMessages}
            component='messages'
        />
    ));

    let deletedMessageElements = deletedMessages.map(m => (
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
            contactPhoto={selectedUser?.photo}
            deleteMessage={deleteMessage}
            spamMessage={spamMessage}
            restoreMessages={restoreMessages}
            deletedByRecipient={m.deletedByRecipient}
            deletedBySender={m.deletedByRecipient}
            isSpam={m.isSpam}
            recipientName={m.recipientName}

            status={m.status}
            requestMessages={requestMessages}
            component='deletedMessages'


        />
    ));

    const addNewMessage = (values: NewMessageFormType) => {
        if (!!selectedUser) {
            addMessage(selectedUser.userId, values.newMessageText);
        }
        requestMessages()
    }

    const onPageSizeHandling = () => {
        setPageInput(true)
    }

    const onDateChanged = (date: string) => {
        console.log(date)

        if (!!selectedUser) {
            dispatch(requestMessagesAfterDate(selectedUser.userId, date))
        }
    }

    return (
        <div className={css.wrapper} >
            <h1> Dialog page</h1>

            <div className={css.dialogWindow}>
                <div className={css.dialogs}>
                    <h4>Dialogs</h4>

                    <div>                        {/* ____Dialog Box____ */}
                        {dialogElements}
                    </div>
                </div>


                <div className={css.messages}>
                    <h4>{'Messages with '}
                        {selectedUser
                            ? (selectedUser.name)
                            : ' ...'}
                    </h4>

                    {
                        isRestoredMessage
                            ? <div >
                                <h5 style={{ marginBottom: '-15px' }}>Restoring messages</h5>
                                <div className={css.closeWindow}>
                                    <button onClick={() => setIsRestoredMessage(false)} data-hint="Close restoring"><CloseCircleOutlined /></button>
                                </div>
                                <div className={css.deletedMessagesBox}>
                                    {deletedMessageElements}
                                </div>
                            </div>

                            : <div>

                                <MessageSearchForm onDateChanged={onDateChanged} />

                                <button className={css.settingButton} onClick={onPageSizeHandling} style={{ fontWeight: 'bold', marginTop: '-60px', marginLeft: "92%" }}><SettingOutlined style={{ margin: '-7px' }} /></button>
                                <div style={{ display: 'flex', justifyContent: 'right', marginTop: '-10px' }}>
                                    <PageNumberSetting value={pageSize}
                                        pagesInput={pagesInput}
                                        settings={setPageInput}
                                        onSubmit={(value) => { setPageSize(value) }}
                                    />
                                </div>

                                {/* _____Message Box____  */}
                                < div className={css.messagesBox}>
                                    {selectedUser
                                        ? <div >
                                            <div className={css.preloader}> {isFetching ? <Preloader /> : null}</div>
                                            {messageElements}
                                        </div>

                                        : ''}
                                </div>
                                {/* __________________________________ */}

                                <Paginator totalItemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />
                                <span>  messages per page: {pageSize}</span>

                                <AddMessageForm onSubmit={addNewMessage} />
                                <div className={css.updateButton}> <button onClick={() => requestMessages()} data-hint="Update messages">Update</button></div>
                                <div className={css.restoreButton} > <button onClick={() => setIsRestoredMessage(true)} data-hint="Restore deleted messages">Restore</button></div>

                            </div>

                    }

                </div>
            </div>
        </div>
    )
}

export default Dialogs;