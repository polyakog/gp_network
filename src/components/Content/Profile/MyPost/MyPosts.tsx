import React from "react";
import AddPostForm, { AddPostFormValueType } from "./AddPostForm/AddPostForm";
import css from './MyPosts.module.css';
import { DispatchPropsType, MapPropsType } from "./MyPostsContainer";
import Post from './Post/Post';

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    // const reversed = [...props.postData].reverse();

    let postElements =
        [...props.postData]
            .reverse()
            .map((p, index) => (<Post key={index} message={p.message} likeCount={p.likeCount} Name={p.Name} id={p.id} postId={p.postId} />));
    // key = { p.postId }

    /* Создаем команды на клик кнопки */
    const onAddPost = (values: AddPostFormValueType) => {
        return (
            props.addPost(values.newPostText)
        )
    }

    return (
        <div className={css.postsBlock}>
            <h3>My posts</h3>
            <AddPostForm onSubmit={onAddPost} />
            {/* Визуализация самих постов */}
            <div className={css.posts}>
                {postElements}
            </div>
        </div>
    );
}

const MyPostsMemorized = React.memo(MyPosts)
export default MyPostsMemorized;