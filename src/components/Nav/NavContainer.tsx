import Nav from "./Nav";
import { connect } from 'react-redux';
import { AppStateType } from "../../redux/redux-store";
import { FriendsType } from "../../redux/sidebar-reducer";


type MapStateToPropsType = {
    friendsData: { friendsId1: Array<FriendsType> }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        friendsData: state.sidebar.friendsData 
    }
}

const NavContainer = connect(mapStateToProps)(Nav)



export default NavContainer;