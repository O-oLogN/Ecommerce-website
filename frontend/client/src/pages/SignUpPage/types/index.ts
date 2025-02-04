import {ISignUpRequest} from "services/types"

export interface SignUpContextProps {
    signedUp: boolean | undefined
    handleSignUp: (signUpRequest: ISignUpRequest) => Promise<void>
    signUpErr: string | undefined
}