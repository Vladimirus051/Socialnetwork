import React from "react";
import s from "./FormsControls.module.css"
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import {ValidatorType} from "../../../utils/validators/validator";

type FormsControlType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode
}
const FormControl: React.FC<FormsControlType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error
    return (
        <div className={s.formControl + " " + (hasError ? s.error : ' ')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}


export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    //const {input, meta, child, ...restProps} = props
    return (
        <FormControl {...props}> <textarea {...input} {...restProps}/></FormControl>
    )
}
export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props
    //const {input, meta, child, ...restProps} = props
    return (
        <FormControl {...props}> <input {...input} {...restProps}/></FormControl>
    )
}

export function createField<FromKeysType extends string>(placeholder: string | undefined,
                                                         name: FromKeysType,
                                                         validate: Array<ValidatorType>,
                                                         component: React.FC<WrappedFieldProps>,
                                                         props = {},
                                                         text = "") {
    return <div>
        <Field placeholder={placeholder} name={name} validate={validate} component={component}
               type="text" {...props}/>{text}
    </div>
}
