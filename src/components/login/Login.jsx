import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { createField, Input } from '../common/FormsControls/FormsControls'
import { required } from '../../utils/validators/validators'
import { connect } from 'react-redux'
import { login } from '../../redux/authReducer'
import { Navigate } from 'react-router-dom'
import styles from './../common/FormsControls/FormsControls.module.css'

const LoginForm = ({ handleSubmit, error, captchaURL }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField('Email', 'email', Input, [required])}
      {createField('Password', 'password', Input, [required], {
        type: 'password',
      })}
      {createField(
        null,
        'rememberMe',
        Input,
        null,
        { type: 'checkbox' },
        'remember me'
      )}
      {captchaURL && <img src={captchaURL} />}
      {captchaURL &&
        createField('Enter symbols from image', 'captcha', Input, [required])}

      {error && <div className={styles.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm({
  form: 'login',
})(LoginForm)

const Login = (props) => {
  const onSubmit = (formData) => {
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

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaURL: state.auth.captchaURL,
})

export default connect(mapStateToProps, { login })(Login)
