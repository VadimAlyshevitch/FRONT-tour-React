import React, { Component } from 'react'
import axios from 'axios'
import is from 'is_js'
import Hero from '../components/Hero'
import Banner from '../components/Banner'


export default class Registration extends Component{


    state = {
        isFormValid: false,
        formControls: {
          email: {
            value: '',
            type: 'email',
            label: 'Email',
            errorMessage: 'Введите корректный email',
            valid: false,
            touched: false,
            validation: {
              required: true,
              email: true
            }
          },
          password: {
            value: '',
            type: 'password',
            label: 'Пароль',
            errorMessage: 'Введите корректный пароль',
            valid: false,
            touched: false,
            validation: {
              required: true,
              minLength: 6
            }
          }
        }
      }
    
      loginHandler = async () => {
        const authData = {
          email: this.state.formControls.email.value,
          password: this.state.formControls.password.value,
          returnSecureToken: true
        }
        try {
          const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCv5JM_Gfyl_rn_8zUYb0LrSazsnCQlDUE', authData)
    
          console.log(response.data)
        } catch (e) {
          console.log(e)
        }
      }
    
      registerHandler = async () => {
        const authData = {
          email: this.state.formControls.email.value,
          password: this.state.formControls.password.value,
          returnSecureToken: true
        }
        try {
          const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCv5JM_Gfyl_rn_8zUYb0LrSazsnCQlDUE', authData)
    
          console.log(response.data);
          alert(`Welcome `,response.data.emails)
        } catch (e) {
          console.log(e)
        }
      }
    
      submitHandler = event => {
        event.preventDefault()
      }
    
      validateControl(value, validation) {
        if (!validation) {
          return true
        }
    
        let isValid = true
    
        if (validation.required) {
          isValid = value.trim() !== '' && isValid
        }
    
        if (validation.email) {
          isValid = is.email(value) && isValid
        }
    
        if (validation.minLength) {
          isValid = value.length >= validation.minLength && isValid
        }
    
        return isValid
      }
    
      onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }
    
        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
    
        formControls[controlName] = control
    
        let isFormValid = true
    
        Object.keys(formControls).forEach(name => {
          isFormValid = formControls[name].valid && isFormValid
        })
    
        this.setState({
          formControls, isFormValid
        })
      }
    
      renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
          const control = this.state.formControls[controlName]
          return (
            <input
              key={controlName + index}
              type={control.type}
              value={control.value}
              valid={control.valid}
              touched={control.touched}
              label={control.label}
              shouldValidate={!!control.validation}
              errorMessage={control.errorMessage}
              onChange={event => this.onChangeHandler(event, controlName)}
              className="formInput"
              placeholder={control.label}
            />
          )
        })
      }
    
      render() {
        return (
            <Hero hero="roomsHero" >
                <div className="Form">
                            <div>
                            <h1>Авторизация</h1>
                    
                            <form onSubmit={this.submitHandler} className="FormAuth">
                    
                                { this.renderInputs() }
                    
                                <button
                                type="success"
                                onClick={this.loginHandler}
                                disabled={!this.state.isFormValid}
                                className="btn-primary btn-form"
                                >
                                Войти
                                </button>
                    
                                <button
                                type="primary"
                                onClick={this.registerHandler}
                                disabled={!this.state.isFormValid}
                                className="btn-primary btn-form"
                                >
                                Зарегистрироваться
                                </button>
                            </form>
                            </div>
                        </div>
            </Hero>
        
        )
      }
   
}
