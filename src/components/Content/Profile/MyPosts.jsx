import React from "react";
import { Field, reduxForm } from "redux-form";
import css from './MyPosts.module.css';
import Post from './Post/Post';



const AddnewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={css.NewPost}>
            <Field component='textarea' name='newPostText' className={css.NewPostText} rows="4" placeholder='Enter your post' />
            {/* Запускаем функцию addPost при нажатии "onClick" */}
            <button className={css.addPostButton}>Add post</button>
        </form>
    )
}

AddnewPostForm = reduxForm({ form: 'ProfileAddNewPostForm' })(AddnewPostForm)




let MyPosts = (props) => {
    
    let postElements = props.postData.map(p => (<Post key={p.postId} message={p.message} likeCount={p.likeCount} Name={p.Name} />));


    /* Создаем команды на клик кнопки */

    const onAddPost = (value) => {
        
        return (
            props.addPost(value.newPostText)
        )
    }

    return (
        <div className={css.postsBlock}>

            <h3>My posts</h3>
            <AddnewPostForm onSubmit={onAddPost} />
            {/* Визуализация самих постов */}
            <div className={css.posts}>
                {postElements}
            </div>

        </div>
    );
}



export default MyPosts;