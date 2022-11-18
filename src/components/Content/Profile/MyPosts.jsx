import React from "react";
import { Field, reduxForm } from "redux-form";
import { required, maxLengthCreator, minLengthCreator } from "../../../utils/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";
import css from './MyPosts.module.css';
import Post from './Post/Post';

let maxLength100 = maxLengthCreator(100);
let minLength2 = minLengthCreator(2);

let AddnewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={css.NewPost}>
            <Field
                name='newPostText'
                type='text'
                component={Textarea}
                label='Add your post here:'
                placeholder='Enter your post'  
                rows="4"                            
                validate={[required, maxLength100, minLength2]}
                
            />
            {/* Запускаем функцию addPost при нажатии "onClick" */}
            <button className={css.addPostButton}>Add post</button>
        </form>
    )
}

const AddnewPostFormRedux = reduxForm({ form: 'ProfileAddNewPostForm' })(AddnewPostForm)




const MyPosts = React.memo( (props) => {
    // const reversed = [...props.postData].reverse();

    let postElements = 
    [...props.postData]
        .reverse()
        .map((p, index) => (<Post key={index} message={p.message} likeCount={p.likeCount} Name={p.Name} />));
    // key = { p.postId }

    /* Создаем команды на клик кнопки */

    const onAddPost = (value) => {
        debugger
        return (
            props.addPost(value.newPostText)
        )
    }

    return (
        <div className={css.postsBlock}>

            <h3>My posts</h3>
            <AddnewPostFormRedux onSubmit={onAddPost} />
            {/* Визуализация самих постов */}
            <div className={css.posts}>
                {postElements}
            </div>

        </div>
    );
}
)



export default MyPosts;