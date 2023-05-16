import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../../redux/redux-store';
import { requestDialogs, requestMessages, addMessage, deleteMessage, spamMessage, restoreMessages,
    addDeletedMessage } from './../../../redux/dialogsApi-reducer';

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage, // DELETE 
        dialogsApiPage: state.dialogsApiPage
    }
}


/* HOC */
// let AuthRedirectComponent = withAuthRedirect (Dialogs)


export default compose<React.ComponentType>(
    connect(mapStateToProps, { 
        requestDialogs, 
        requestMessages, 
        addMessage,
        deleteMessage,
        spamMessage,
        restoreMessages,
        
    }),
    withAuthRedirect
)(Dialogs);