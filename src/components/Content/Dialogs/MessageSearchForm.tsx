import { Formik, Form, Field, /* ErrorMessage */ } from 'formik';
import { FormikHelpers } from 'formik/dist/types';
import React from 'react';
import css from './Dialogs.module.css'
import { ClassAttributes } from 'react';



const messageSearchFormValidate = (values: any) => {
    const errors = {};
    return errors;
}

type PropsType = {
    onDateChanged: (date: string) => void
}

type FormType = {
    date: string
}

export const MessageSearchForm: React.FC<PropsType> = React.memo(({ onDateChanged }) => {
    const submit = (values: FormType, { setSubmitting }: FormikHelpers<FormType>) => {
        onDateChanged(String(values.date))
        setSubmitting(false)
    }

    return <div >
        <Formik
            enableReinitialize
            initialValues={{ date: '' }}
            validate={messageSearchFormValidate}
            onSubmit={submit}
        >
            {({ isSubmitting }) => (
                <Form className={css.formik}>
                    <label > from the date</label>
                    <Field type="date"  name="date"/>

                    <button type="submit" disabled={isSubmitting}>Show</button>
                </Form>
            )}
        </Formik>

    </div>
})