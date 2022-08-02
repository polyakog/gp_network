import React from "react";
import css from './MyPosts.module.css';
import Post from './Post/Post';



const MyPosts = () => {

    /* База данных */
    let postData = [
        {id: 1, message: 'Very interesting', likeCount: 21, Name: 'Alexey'},
        {id: 2, message: 'How to add data?', likeCount: 2, Name: 'Anton'},
        {id: 3, message: 'finally. It is a new good network', likeCount: 51, Name: 'Peter'},
        {id: 4, message: "I'm agree", likeCount: 41, Name: 'Martin'},
        {id: 5, message: 'We can share info here', likeCount: 44, Name: 'Alexey'},
        {id: 6, message: 'I will upload all data', likeCount: 53, Name: 'Gennadij'},

    ]
                /* Обработка массива, чтобы исключить повторения. */
                /* Автоматически данные заносятся в новый массив из старого  */
let postElements = postData.map (p => (<Post message={p.message} likeCount={p.likeCount} Name={p.Name} />) );

    return (
        <div className={css.postsBlock}>

            <h3>My posts</h3>
            <div className={css.NewPost}>
                <textarea className={css.NewPostText}>Write your post hire</textarea>
                <a className={css.addPostButton}>Add post</a>

            </div>
            <div className={css.posts}> 
              {postElements}  
            </div>
            

                     


        </div>
    );
}

export default MyPosts;