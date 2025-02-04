import Title from "components/Title.tsx"
import UsernameInput from "components/UsernameInput.tsx"
import PasswordInput from "components/PasswordInput.tsx"
import SubmitButton from "components/SubmitButton.tsx"
import SignUpTitle from "pages/LoginPage/components/SignUpTitle.tsx"
import {useState} from "react"
import {useLoginContext} from "pages/LoginPage/hooks"
import {LoginContextProps} from "pages/LoginPage/types"
import SuccessAlert from "components/SuccessAlert.tsx"
import ErrorAlert from "components/ErrorAlert.tsx"

const LoginPage = () => {
    const [isUsernameError, setIsUsernameError] = useState({ isError: false, alertMsg: '' })
    const [isPasswordError, setIsPasswordError] = useState({ isError: false, alertMsg: '' })
    const [formValues, setFormValues] = useState({ username: '', password: '' })

    const {
        handleLogin,
        authenticated,
    } = useLoginContext() as LoginContextProps
    const handleSubmitLoginForm = (event: any) => {
        event.preventDefault()

        const loginForm = document.querySelector('.login-form')
        const usernameInput = loginForm?.querySelectorAll('input')[0]
        const passwordInput = loginForm?.querySelectorAll('input')[1]
        const username = usernameInput!.value
        const password = passwordInput!.value

        setFormValues({ username, password })   // Save values when below set state actions trigger reloading page
        
        if (!username) {
            setIsUsernameError({ isError: true, alertMsg: 'Username is required' })
        }
        else {
            setIsUsernameError({ isError: false, alertMsg: '' })
        }
        if (!password) {
            setIsPasswordError({ isError: true, alertMsg: 'Password is required' })
            return
        }
        else {
            setIsPasswordError({ isError: false, alertMsg: '' })
        }

        handleLogin({
            username, password
        }).then(() => {})
    }

    return (
        <>
            { authenticated && <SuccessAlert
                message='Login successfully'
                description='Login successfully!'
            /> }
            { authenticated === false && <ErrorAlert
                message='Login failed'
                description='Invalid username or password'
            /> }
            <form
                className='mt-[40px] login-form'
                onSubmit={ handleSubmitLoginForm }
            >
                <Title content='Welcome back'/>
                <UsernameInput
                    value={ formValues.username }
                    isError={ isUsernameError.isError }
                    alertMsg={ isUsernameError.alertMsg }
                >
                </UsernameInput>
                <PasswordInput
                    title='Password'
                    textHolder='Your password here'
                    value={ formValues.password }
                    isError={ isPasswordError.isError }
                    alertMsg={ isPasswordError.alertMsg }
                />
                <SubmitButton buttonName='Sign in' />
                <SignUpTitle />
            </form>
        </>
    )
}

export default LoginPage