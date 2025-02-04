import {SignUpContextProps} from "pages/SignUpPage/types"
import {createContext, useContext, useState} from "react"
import {useSignUp} from 'services'
import {ISignUpRequest} from 'services/types'

const SignUpContext = createContext<SignUpContextProps>({
    signedUp: undefined,
    handleSignUp: async() => {},
    signUpErr: undefined,
})

export const SignUpContextProvider = ({ children } : { children: any }) => {
    const signUpMutation = useSignUp()
    const [signedUp, setSignedUp] = useState<boolean | undefined>(undefined)
    const [signUpErr, setSignUpErr] = useState<string | undefined>(undefined)
    const handleSignUp = async (signUpRequest: ISignUpRequest) => {
        if (!signUpRequest) {
            return
        }
        signUpMutation.mutate(signUpRequest, {
            onSuccess: () => {
                console.log('Sign up successfully')
                setSignedUp(true)
            },
            onError: (error) => {
                console.log('Sign up error:', error)
                setSignedUp(false)
                setSignUpErr(error.message)
            }
        })
    }
    return (
        <SignUpContext.Provider value={{
            signedUp,
            handleSignUp,
            signUpErr,
        }}>
            {children}
        </SignUpContext.Provider>
    )
}

export const useSignUpContext = () => {
    return useContext(SignUpContext)
}
