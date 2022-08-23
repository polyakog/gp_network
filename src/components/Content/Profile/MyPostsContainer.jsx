import React from "react";
import { addPostActionCreator, updateNewPostTextActionCreator } from './../../../redux/profile-reducer';
import MyPosts from "./MyPosts";



            /* Визуализация разела постов */ 

let MyPostsContainer = (props) => {
 
 let state = props.store.getState();

                /* Создаем команды на клик кнопки и изменение текстэриа */
    let onAddPost = () => {
        
        props.store.dispatch(addPostActionCreator ());
    }

    let onPostChange = (text) => {
        
        props.store.dispatch(updateNewPostTextActionCreator(text));
    }

    return (<MyPosts postData={state.profilePage.postData} 
        newPostText={state.profilePage.newPostText} 
        addPost={onAddPost} 
        updateNewPostText={onPostChange} />)

}

export default MyPostsContainer;