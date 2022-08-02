import React from "react";
import css from './Post.module.css';



const Post = (props) => {

    return (
        <div className={css.post}>
            <div className={css.user}>
                <img src="https://cdn1.flamp.ru/1ade70d2f2f936f3ced673e84d129204.jpg" alt="" />
                <span>{props.Name}: </span>
            </div>

            <div className={css.Item}>
                {props.message}

            </div>
            <div className={css.underPost}>
                likes: {props.likeCount}
                <div className={css.like}>
                    <img src="https://pngicon.ru/file/uploads/like.png" alt="" srcset="" />
                </div>
            </div>




        </div>
    );
}

export default Post;