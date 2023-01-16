import { sendMessageActionCreator } from '../../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../../redux/redux-store';

type MapStateToPropsType = {
    dialogsPage: any
}

type MapDispatchToPropsType = {
    sendMessage: (newText: string) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch: any): MapDispatchToPropsType => {
    return {
        sendMessage: (newText: string) => {
            dispatch(sendMessageActionCreator(newText))
        }
    }
}

/* HOC */
// let AuthRedirectComponent = withAuthRedirect (Dialogs)


export default compose<PropsType>(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);