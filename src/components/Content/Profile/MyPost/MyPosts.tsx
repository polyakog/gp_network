import React from "react";
import AddPostForm from "./AddPostForm/AddPostForm";
import css from './MyPosts.module.css';
import Post from './Post/Post';


const MyPosts = React.memo((props) => {
    // const reversed = [...props.postData].reverse();

    let postElements =
        [...props.postData]
            .reverse()
            .map((p, index) => (<Post key={index} message={p.message} likeCount={p.likeCount} Name={p.Name} />));
    // key = { p.postId }

    /* Создаем команды на клик кнопки */

    const onAddPost = (value) => {
        return (
            props.addPost(value.newPostText)
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
)

export default MyPosts;