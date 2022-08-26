import { addPostActionCreator, updateNewPostTextActionCreator } from './../../../redux/profile-reducer';
import MyPosts from "./MyPosts";
import { connect } from 'react-redux/es/exports';




let mapStateToProps = (state) => {
    return {
        postData: state.profilePage.postData,
        newPostText: state.profilePage.newPostText

    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => {
            dispatch(addPostActionCreator())
        },

        updateNewPostText: (text) => {
            dispatch(updateNewPostTextActionCreator(text))
        }
    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;