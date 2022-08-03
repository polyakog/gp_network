import React from "react";
import css from './MyPosts.module.css';
import Post from './Post/Post';
// import {postData} from './../../../index';



            {/* Визуализация разела постов */ }

const MyPosts = (props) => {

 
                /* Обработка массива postData, чтобы исключить повторения команд. */
                /* Автоматически данные заносятся в новый цикл "p" из массива "postData" */

    let postElements = props.postData.map (p => (<Post message={p.message} likeCount={p.likeCount} Name={p.Name} />) );

    return (
        <div className={css.postsBlock}>

            <h3>My posts</h3>
            <div className={css.NewPost}>
                <textarea className={css.NewPostText}>Write your post hire</textarea>
                <a className={css.addPostButton}>Add post</a>

                {/* Визуализация самих постов */}
            </div>
            <div className={css.posts}> 
              {postElements}  
            </div>
            

                     


        </div>
    );
}

export default MyPosts;