import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, minLengthCreator, required } from "../../../../../utils/validators";
import { Textarea } from "../../../../common/FormsControls/FormsControls";
import css from './../MyPosts.module.css';


let maxLength100 = maxLengthCreator(100);
let minLength2 = minLengthCreator(2);

let AddPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={css.NewPost}>
            <Field
                name='newPostText'
                type='text'
                component={Textarea}
                label='Add your post here:'
                placeholder='Enter your post'
                rows="4"
                validate={[required, maxLength100, minLength2]}

            />
            {/* Запускаем функцию addPost при нажатии "onClick" */}
            <button className={css.addPostButton}>Add post</button>
        </form>
    )
}

export default reduxForm({ form: 'ProfileAddNewPostForm' })(AddPostForm)