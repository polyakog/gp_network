import React from 'react';
import { NavLink } from 'react-router-dom';
import noPhoto from '../../../../assets/images/noPic.jpg'
import css from './../Dialogs.module.css';
import { DialogsResponseType } from '../../../../types/types';
import { SelectedUserType } from '../Dialogs';
import { formatDate } from '../../../common/Date/formatDate';


type PropsType = {
    selectedUser: SelectedUserType | null
    onUserSelected: (user: SelectedUserType) => void
}

const DialogItem: React.FC<PropsType & DialogsResponseType> = (props) => {
    let avatarPhoto: string = noPhoto
    if (props.photos.small) { avatarPhoto = props.photos.small }

    // let actitvityDate = props.lastUserActivityDate.split('T')[0]
    // let actitvityTime = props.lastUserActivityDate.split('T')[1].slice(0, 5)
  
    let formatedDate = formatDate(new Date(props.lastUserActivityDate + 'Z'))

    return (
        <div>

            <NavLink onClick={()=>{
                props.onUserSelected({userId: props.id, name:props.userName, photo: props.photos})
            }
            } className={({ isActive }) => (isActive ? (css.dialog + " " + css.active) : css.dialog)} to={'/dialogs/' + props.id}>
                <div className={css.user}>
                    <img src={avatarPhoto} alt="" />
                    <span>{props.userName}</span>
                </div>
            </NavLink>
            <div className={css.additionalDialogInfo}>
                <p>online: {formatedDate}</p>
                {props.hasNewMessages
                    ? <p className={css.dialogHasMessages}>new messages: {props.newMessagesCount}</p>
                    : <p className={css.dialogHasMessages + ' ' + css.dialogNoMessages}>no new messages</p>}

            </div>

        </div>

    )
}


export default DialogItem;