import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux/es/exports';



let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            dispatch(sendMessageActionCreator())
    },
       
        updateNewMessageText: (text) => {
            dispatch(updateNewMessageTextActionCreator(text))
    } 
      
    }
    
}

const DialogsContainer = connect (mapStateToProps, mapDispatchToProps)(Dialogs)

export default DialogsContainer;