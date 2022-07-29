import React from "react";
import css from './MyPosts.module.css';
import Post from './Post/Post';




const MyPosts = () => {


    let postData = [
        {id: 1, message: 'Very interesting', likeCount: 21, Name: 'Alexey'},
        {id: 2, message: 'How to add data?', likeCount: 2, Name: 'Anton'},
        {id: 3, message: 'finally. It is a new good network', likeCount: 51, Name: 'Peter'},
        {id: 4, message: "I'm agree", likeCount: 41, Name: 'Martin'},
        {id: 5, message: 'We can share info here', likeCount: 44, Name: 'Alexey'},
        {id: 6, message: 'I will upload all data', likeCount: 53, Name: 'Gennadij'},

    ]


    return (
        <div className={css.Posts}>

            <h3>My posts</h3>
            <div className={css.NewPost}>
                <textarea className={css.NewPostText}>Write your post hire</textarea>
                <a className={css.addPostButton}>
                                            Add post
                    
                </a>

            </div>

            <Post message={postData[0].message} likeCount={postData[0].likeCount} Name={postData[0].Name} />
            <Post message={postData[1].message} likeCount={postData[1].likeCount} Name={postData[1].Name} />
            <Post message={postData[2].message} likeCount={postData[2].likeCount} Name={postData[2].Name} />
            <Post message={postData[3].message} likeCount={postData[3].likeCount} Name={postData[3].Name} />
            <Post message={postData[4].message} likeCount={postData[4].likeCount} Name={postData[4].Name} />
            <Post message={postData[5].message} likeCount={postData[5].likeCount} Name={postData[5].Name} />
                       


        </div>
    );
}

export default MyPosts;