import { actions as actions2 } from '../../../redux/dialogs-reducer'; // DELETE 
import { actions } from '../../../redux/dialogsApi-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../../redux/redux-store';

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
        setDialogs: actions.setDialogs, 
        setMessages: actions.sendMessage, 
        sendMessage: actions2.sendMessage // DELETE 
    }),
    withAuthRedirect
)(Dialogs);