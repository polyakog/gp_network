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

            <Post message='Very interesting' likeCount='21' Name='Alexey'/>
            <Post message='How to add data?' likeCount='2' Name='Anton' />
            <Post message='finally. It is a new good network' likeCount='56' Name='Peter' />
            <Post message="I'm agree" likeCount='10' Name='Martin' />
           


        </div>
    );
}

export default MyPosts;