import React from "react";
import StoreContext from "../../../StoreContext";
import { addPostActionCreator, updateNewPostTextActionCreator } from './../../../redux/profile-reducer';
import MyPosts from "./MyPosts";



            /* Визуализация разела постов */ 

const MyPostsContainer = (props) => {
 
 return <StoreContext.Consumer> 
        {(store) => {

    
    let state = store.getState();

                /* Создаем команды на клик кнопки и изменение текстэриа */
    let onAddPost = () => {
        
        store.dispatch(addPostActionCreator ());
    }

    let onPostChange = (text) => {
        
        store.dispatch(updateNewPostTextActionCreator(text));
    }

    return <MyPosts postData={state.profilePage.postData} 
        newPostText={state.profilePage.newPostText} 
        addPost={onAddPost} 
        updateNewPostText={onPostChange} />

         }
     }
     </StoreContext.Consumer>


 

}

export default MyPostsContainer;