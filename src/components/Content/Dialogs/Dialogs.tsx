import React, { useEffect, useState } from 'react';
import css from './Dialogs.module.css';
import DialogItem from './DialogItems/DialogItems';
import MessageItem from './MessageItems/MessageItems';
import AddMessageForm from '../../common/Forms/AddMessageForm';
import { InitialStateType } from '../../../redux/dialogs-reducer';
import { DialogsResponseType, MessageItemsType } from '../../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { getDialogs, getMessages } from '../../../redux/dialogApi-selectors';
import { AppDispatchType } from '../../../redux/redux-store';
import { requestDialogs, requestMessages, startChatting } from '../../../redux/dialogsApi-reducer';
import Paginator from '../../common/Paginator/Paginator';
import { SettingOutlined } from '@ant-design/icons';
import { PageNumberSetting } from '../../common/Paginator/PageNumberSettings';
import { PhotosType } from '../../../types/types';



type PropsType = {
    dialogsPage: InitialStateType
    requestDialogs: () => void
    requestMessages: (userId: number, currentPage: number, pageSize: number, setTotalUsersCount: any) => void
    addMessage: (userId: number, newMessageText: string) => void
    deleteMessage: (messageId: string) => void
    spamMessage: (messageId: string) => void
    restoreDeletedSpamMessages: (messageId: string) => void
}

export type NewMessageFormType = {
    newMessageText: string

}

export type SelectedUserType = {
    name: string
    userId: number
    photo: PhotosType
}



const Dialogs: React.FC<PropsType> = ({ addMessage, deleteMessage, spamMessage, restoreDeletedSpamMessages }) => {

    const dialogs = useSelector(getDialogs)
    const messages = useSelector(getMessages)
    const [selectedUser, setSelectedUser] = useState<SelectedUserType | null>(null)
    const dispatch: AppDispatchType = useDispatch()


    /* Page Settings */
    const [totalUsersCount, setTotalUsersCount] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [pagesInput, setPageInput] = useState(false)
    const onPageChanged = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    const showMessages = () => {
        if (!!selectedUser) {
            dispatch(requestMessages(selectedUser.userId, currentPage, pageSize, setTotalUsersCount))
            dispatch(startChatting(selectedUser.userId))
        }
    }

    useEffect(() => {
        dispatch(requestDialogs())

    }, [])

    useEffect(() => {
        showMessages()


    }, [selectedUser, totalUsersCount, currentPage, pageSize])


    useEffect(() => {
        setCurrentPage(1)
    }, [pageSize, selectedUser, totalUsersCount])


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
    ));
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
            restoreDeletedSpamMessages={restoreDeletedSpamMessages}

        />
    ));

    const addNewMessage = (values: NewMessageFormType) => {
        if (!!selectedUser) {
            addMessage(selectedUser.userId, values.newMessageText);
        }

        showMessages()



    }

    const onPageSizeHandling = () => {
        setPageInput(true)

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
                    <button className={css.settingButton} onClick={onPageSizeHandling} style={{ fontWeight: 'bold', marginTop: '-60px', marginLeft: "92%" }}><SettingOutlined style={{ margin: '-7px' }} /></button>
                    <div style={{ display: 'flex', justifyContent: 'right', marginTop: '-40px' }}>
                        <PageNumberSetting value={pageSize}
                            pagesInput={pagesInput}
                            settings={setPageInput}
                            onSubmit={(value) => { setPageSize(value) }}
                        />
                    </div>


                    <div className={css.messagesBox}> {/* _____Message Box____ */}
                        {selectedUser
                            ? messageElements
                            : ''}

                    </div>


                    <Paginator totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />
                    <span>  messages per page: {pageSize}</span>



                    <AddMessageForm onSubmit={addNewMessage} />
                    <div className={css.updateButton}> <button >Update</button></div>







                </div>
            </div>
        </div>
    )
}

export default Dialogs;