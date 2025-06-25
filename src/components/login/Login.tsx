import React from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import {
  createField,
  GetStringKeys,
  Input,
} from '../common/FormsControls/FormsControls'
import { required } from '../../utils/validators/validators'
import { connect } from 'react-redux'
import { login } from '../../redux/authReducer'
import { Navigate } from 'react-router-dom'
import styles from './../common/FormsControls/FormsControls.module.css'
import { AppStateType } from '../../redux/reduxStore'

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

type mapStateToPropsType = {
  isAuth: boolean
  captchaURL: string | null
}
type mapDispatchToPropsType = {
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
  ) => void
}

export type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string | null
}
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

const Login: React.FC<mapStateToPropsType & mapDispatchToPropsType> = (
  props
) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    )
  }

  if (props.isAuth) {
    return <Navigate to={'/profile'} />
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaURL={props.captchaURL} />
    </div>
  )
}

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
  isAuth: state.auth.isAuth,
  captchaURL: state.auth.captchaURL,
})

export default connect(mapStateToProps, { login })(Login)
