import { Formik, Form, Field, /* ErrorMessage */ } from 'formik';
import { FormikHelpers } from 'formik/dist/types';
import React from 'react';
import { FilterType } from '../../../redux/users-reducer';
import css from './Users.module.css'


const usersSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
    filter: FilterType
}

type FormType = {
    term: string,
    friend: string
}

export const UsersSearchForm: React.FC<PropsType> = React.memo(({ onFilterChanged, filter }) => {
    const submit = (values: FormType, { setSubmitting }: FormikHelpers<FormType>) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null :
                values.friend === "true" ? true : false
        }
        onFilterChanged(filter)
        setSubmitting(false)
    }

    return <div className={css.formik}>
        <Formik
            initialValues={{ term: filter.term, friend: 'null' }}
            validate={usersSearchFormValidate}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form >
                    <Field type="text" name="term" />
                    <Field as="select" name="friend">
                        <option value="null" >All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed </option>
                    </Field>

                    <button type="submit" disabled={isSubmitting}>
                        Find
                    </button>
                </Form>
            )}
        </Formik>

    </div>
})