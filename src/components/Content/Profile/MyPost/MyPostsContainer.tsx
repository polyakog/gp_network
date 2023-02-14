import { actions } from '../../../../redux/profile-reducer';
import MyPosts from "./MyPosts";
import { connect } from 'react-redux';
import { AppStateType } from '../../../../redux/redux-store';
import { PostDataType } from '../../../../types/types';


export type MapPropsType = {
    postData: Array<PostDataType>
}
export type DispatchPropsType = {
    addPost: (newPostText: string) => void
}

type OwnPropsType = {}

let mapStateToProps = (state: AppStateType): MapPropsType => {
    return {
        postData: state.profilePage.postData,
    }
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { addPost: actions.addPost })(MyPosts)

export default MyPostsContainer;