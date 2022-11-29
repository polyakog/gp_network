import { sendMessageActionCreator} from '../../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
// import { connect } from 'react-redux/es/exports';
import { withAuthRedirect } from './../../../hoc/withAuthRedirect';
import { compose } from 'redux';



let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newText) => {
            dispatch(sendMessageActionCreator(newText))
    },
       
        
    }
    }

    /* HOC */
// let AuthRedirectComponent = withAuthRedirect (Dialogs)


export default compose (
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);