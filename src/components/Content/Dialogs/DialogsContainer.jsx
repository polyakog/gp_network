import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux/es/exports';
import { withAuthRedirect } from './../../../hoc/withAuthRedirect';



let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        
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

    /* HOC */
let AuthRedirectComponent = withAuthRedirect (Dialogs)

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

export default DialogsContainer;