import React from "react";
import css from './MyPosts.module.css';
import Post from './Post/Post';


            /* Визуализация разела постов */ 

let MyPosts = (props) => {

 
                /* Обработка массива postData, чтобы исключить повторения команд. */
                /* Автоматически данные заносятся в новый цикл "p" из массива "postData" */
    let postElements = props.postData.map (p => (<Post message={p.message} likeCount={p.likeCount} Name={p.Name} />) );

                /* Создаем ссылку */
    let newPostElem = React.createRef ();



                /* Создаем команды на клик кнопки и изменение текстэриа */
    let addPostClick = () => {
        props.addPost();
    }

    let onPostChange = () => {
        let text = newPostElem.current.value;
        props.changePost(text);
    }

    return (
        <div className={css.postsBlock}>

            <h3>My posts</h3>
            <div className={css.NewPost}>
                <textarea className={css.NewPostText} ref={newPostElem} rows="4" onChange={onPostChange} value={props.newPostData}/>
                                {/* Запускаем функцию addPost при нажатии "onClick" */}
                <button className={css.addPostButton} onClick={addPostClick}>Add post</button> 
                

                {/* Визуализация самих постов */}
            </div>
            <div className={css.posts}> 
              {postElements}  
            </div>
                               


        </div>
    );
}

export default MyPosts;