import {UserInfo} from "types/UserInfo"

                                        /* REQUEST */
/* Auth */

export interface ILoginRequest {
    username: string
    password: string
}

export interface ISignUpRequest {
    username: string
    password: string
    email: string
}



                                        /* RESPONSE */
/* Auth */
export interface ISignUpResponse extends UserInfo {}