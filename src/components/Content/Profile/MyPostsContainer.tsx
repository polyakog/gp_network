import { addPostActionCreator } from '../../../redux/profile-reducer';
import MyPosts from "./MyPosts";
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/redux-store';





let mapStateToProps = (state:AppStateType) => {
    return {
        postData: state.profilePage.postData,
  }
}

let mapDispatchToProps = (dispatch:any) => {
    return {
        addPost: (postText:string) => {
            dispatch(addPostActionCreator(postText))
        },

    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;