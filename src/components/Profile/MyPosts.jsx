import React from "react";
import css from './MyPosts.module.css';
import Post from './Post/Post';


const MyPosts = () => {

    return (
        <div className={css.Posts}>

            <div>My post text</div>
            <div className={css.NewPost}>
                <textarea className={css.NewPostText}>Write your post hire</textarea>
                <div >
                    <div className={css.addPostButton}> Add post</div>
                    </div>

            </div>

            <Post />
            <Post />
            <Post />
            <Post />


        </div>
    );
}

export default MyPosts;