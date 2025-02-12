import UsernameInput from 'components/UsernameInput.tsx'
import PasswordInput from 'components/PasswordInput.tsx'
import SubmitButton from 'components/SubmitButton.tsx'
import EmailInput from 'components/EmailInput.tsx'
import SuccessAlert from 'components/SuccessAlert.tsx'
import ErrorAlert from 'components/ErrorAlert.tsx'
import Title from 'components/Title.tsx'
import {useEffect, useState} from "react"
import {useSignUpContext} from "pages/SignUpPage/hooks"
import {SignUpContextProvider} from "pages/SignUpPage/hooks"
import {useNavigate} from "react-router-dom"
import {REQUEST_MAPPING, REQUEST_PATH} from "routes"

const SignUpPage = () => {
    const {
        signedUp,
        handleSignUp,
        signUpErr,
    } = useSignUpContext()
    const navigate = useNavigate()
    const [isUsernameError, setIsUsernameError] = useState({isError: false, alertMsg: ''})
    const [isPasswordError, setIsPasswordError] = useState({isError: false, alertMsg: ''})
    const [isRetypePasswordError, setIsRetypePasswordError] = useState({isError: false, alertMsg: ''})
    const [isEmailError, setIsEmailError] = useState({isError: false, alertMsg: ''})
    const [formValues, setFormValues] = useState(
        {
            username: '',
            password: '',
            retypePassword: '',
            email: ''
        })

    const handleSubmitSignUpForm = (event: any) => {
        event.preventDefault()

        const signUpForm = document.querySelector('.sign-up-form')
        const inputFields = signUpForm?.querySelectorAll('input')
        const usernameInput = inputFields![0]
        const passwordInput = inputFields![1]
        const retypePasswordInput = inputFields![2]
        const emailInput = inputFields![3]

        const username = usernameInput!.value
        const password = passwordInput!.value
        const retypePassword = retypePasswordInput!.value
        const email = emailInput!.value

        setFormValues({ username, password, retypePassword, email })   // Save values when below set state actions trigger reloading page

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
        if (!retypePassword) {
            setIsRetypePasswordError({ isError: true, alertMsg: 'Retype password is required' })
            return
        }
        else if (retypePassword !== password) {
            setIsRetypePasswordError({ isError: true, alertMsg: 'Passwords must match' })
            return
        }
        else {
            setIsRetypePasswordError({ isError: false, alertMsg: '' })
        }
        if (!email) {
            setIsEmailError({ isError: true, alertMsg: 'Email is required' })
            return
        }
        else {
            setIsEmailError({ isError: false, alertMsg: '' })
        }

        handleSignUp({
            username,
            password,
            email,
        }).then(() => {})
    }

    useEffect(() => {
        if (signedUp) {
            navigate(REQUEST_MAPPING.AUTH + REQUEST_PATH.SIGN_IN)
        }
    }, [signedUp])

    return (
        <>
            { signedUp && <SuccessAlert
                    message='Sign up successfully'
                    description='Sign up successfully!' />
            }
            { signedUp === false && <ErrorAlert
                    message='Signed up failed'
                    description={ 'Error occurred: ' + signUpErr } />
            }
            <Title content='Sign up' />
            <form
                className='sign-up-form'
                onSubmit={ (event) => handleSubmitSignUpForm(event) }>
                <UsernameInput
                    value={ formValues.username }
                    isError={ isUsernameError.isError }
                    alertMsg={ isUsernameError.alertMsg }
                />
                <PasswordInput
                    title='Password'
                    textHolder='First time'
                    value={ formValues.password }
                    isError={ isPasswordError.isError }
                    alertMsg={ isPasswordError.alertMsg }
                />
                <PasswordInput
                    title='Retype password'
                    textHolder='Second time'
                    value={ formValues.retypePassword }
                    isError={ isRetypePasswordError.isError }
                    alertMsg={ isRetypePasswordError.alertMsg }
                />
                <EmailInput
                    value={ formValues.email }
                    isError={ isEmailError.isError }
                    alertMsg={ isEmailError.alertMsg }
                />
                <SubmitButton buttonName='Sign up' />
            </form>
        </>
    )
}

const SignUpPageWrapper = () => {
    return (
        <SignUpContextProvider>
            <SignUpPage />
        </SignUpContextProvider>
    )
}
export default SignUpPageWrapper