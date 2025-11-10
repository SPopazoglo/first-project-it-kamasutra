import React from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  createField,
  GetStringKeys,
  Input,
} from '../common/FormsControls/FormsControls'
import { required } from '../../utils/validators/validators'
import { login } from '../../redux/authReducer'
import { AppDispatch, AppStateType } from '../../redux/reduxStore'
import styles from './../common/FormsControls/FormsControls.module.css'

type LoginFormOwnProps = {
  captchaURL: string | null
}

const LoginForm: React.FC<
  InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, error, captchaURL }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>('Email', 'email', Input, [
        required,
      ])}
      {createField<LoginFormValuesTypeKeys>(
        'Password',
        'password',
        Input,
        [required],
        {
          type: 'password',
        }
      )}
      {createField<LoginFormValuesTypeKeys>(
        undefined,
        'rememberMe',
        Input,
        [],
        { type: 'checkbox' },
        'remember me'
      )}
      {captchaURL && <img src={captchaURL} />}
      {captchaURL &&
        createField<LoginFormValuesTypeKeys>(
          'Enter symbols from image',
          'captcha',
          Input,
          [required]
        )}

      {error && <div className={styles.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: 'login',
})(LoginForm)

export type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string | null
}
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

export const Login: React.FC = (props) => {
  const captchaURL = useSelector((state: AppStateType) => state.auth.captchaURL)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

  const dispatch: AppDispatch = useDispatch()

  const onSubmit = (formData: LoginFormValuesType) => {
    dispatch(
      login(
        formData.email,
        formData.password,
        formData.rememberMe,
        formData.captcha
      )
    )
  }

  if (isAuth) {
    return <Navigate to={'/profile'} />
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaURL={captchaURL} />
    </div>
  )
}
