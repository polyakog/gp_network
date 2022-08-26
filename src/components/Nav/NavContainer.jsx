import Nav from "./Nav";
import { connect } from 'react-redux/es/exports';



let mapStateToProps = (state) => {
    return {
        friendsData: state.sidebar.friendsData 
    }
}

const NavContainer = connect(mapStateToProps)(Nav)



export default NavContainer;