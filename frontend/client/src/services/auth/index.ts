import {getAxiosInstance, IBaseResponse} from 'services'
import {ILoginRequest, ISignUpRequest, ISignUpResponse} from "services/types"
import {REQUEST_MAPPING, REQUEST_PATH} from "routes"
import {useMutation} from "@tanstack/react-query"

export const useLogin= () => {
        return useMutation(
            {
                mutationFn: async (params: ILoginRequest) => {
                    const response = await getAxiosInstance().post<IBaseResponse<string>>(
                        REQUEST_MAPPING.AUTH + REQUEST_PATH.SIGN_IN,
                        params
                    )
                    return response.data
                }
            }
        )
    }

export const useSignUp = () => {
    return useMutation({
        mutationFn: async (params: ISignUpRequest) => {
            const queryParams = new URLSearchParams({
                username: params.username,
                password: params.password,
                email: params.email,
            })
            const response = await getAxiosInstance().post<ISignUpResponse>(
                `${REQUEST_MAPPING.AUTH}${REQUEST_PATH.SIGN_UP}?${queryParams}`
            )
            return response.data
        }
    })
}

export const useVerifyToken= () => {
    return useMutation({
        mutationKey: ['verify-token'],
        mutationFn: async() => {
            const response = await getAxiosInstance().post<IBaseResponse<String>>(
                REQUEST_MAPPING.AUTH + REQUEST_PATH.VERIFY_TOKEN,
            )
            return response.data
        },
    })
}