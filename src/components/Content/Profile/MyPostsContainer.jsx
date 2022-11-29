import { addPostActionCreator } from './../../../redux/profile-reducer';
import MyPosts from "./MyPosts";
import { connect } from 'react-redux';
// import { connect } from 'react-redux/es/exports';




let mapStateToProps = (state) => {
    return {
        postData: state.profilePage.postData,
        

    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (postText) => {
            dispatch(addPostActionCreator(postText))
        },

    }
}


const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;