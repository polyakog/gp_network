import { InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, minLengthCreator, required } from "../../../../../utils/validators";
import { createField, GetStringKeys, Textarea } from "../../../../common/FormsControls/FormsControls";
import css from './../MyPosts.module.css';


let maxLength300 = maxLengthCreator(300);
let minLength2 = minLengthCreator(2);

export type AddPostFormValueType = {
    newPostText: string
}
type OwnPropsType = {}
type AddPostFormValueTypeKeys = GetStringKeys<AddPostFormValueType> 

let AddPostForm:React.FC<InjectedFormProps<AddPostFormValueType, OwnPropsType> & OwnPropsType > = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={css.NewPost}>
            
                    {createField<AddPostFormValueTypeKeys>(props.error, 'newPostText', 'Add your post here:', Textarea, 'text', 'Enter your post', '', [required, maxLength300, minLength2], '', 4)}
          
            {/* Запускаем функцию addPost при нажатии "onClick" */}
            <button className={css.addPostButton}>Add post</button>
        </form>
    )
}

export default reduxForm<AddPostFormValueType, OwnPropsType>({ form: 'ProfileAddNewPostForm' })(AddPostForm)