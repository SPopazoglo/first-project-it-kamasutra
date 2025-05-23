import React from 'react'
import styles from './FormsControls.module.css'
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form'
import { FieldValidatorType } from '../../../utils/validators/validators'

type FormControlPropsType = {
  meta: WrappedFieldMetaProps
  children: React.ReactNode
}

const FormControl: React.FC<FormControlPropsType> = ({
  meta: { touched, error },
  children,
}) => {
  const hasError = touched && error
  return (
    <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
      <div>{children}</div>
      {hasError && <span>{error}</span>}
    </div>
  )
}

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  )
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  )
}

export function createField<FormKeysType extends string>(
  placeholder: string | undefined,
  name: FormKeysType,
  component: React.FC<WrappedFieldProps>,
  validators: Array<FieldValidatorType>,
  props = {},
  text = ''
) {
  return (
    <div>
      <Field
        placeholder={placeholder}
        component={component}
        validate={validators}
        name={name}
        {...props}
      />
      {text}
    </div>
  )
}
