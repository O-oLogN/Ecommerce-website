import {IAuthResponse, IPagingResponse, IQueryRequest} from "../../types"
import {useQuery} from "react-query"
import {axiosInstance} from "../index.ts";
import {REQUEST_MAPPING, REQUEST_PATH} from "../../constants"
import {ILoginRequest} from "../../pages/Login/types";

export const useLogin=
    (params: IQueryRequest<ILoginRequest> | ILoginRequest) => {
    return useQuery<IPagingResponse<IAuthResponse> | IAuthResponse>(
        ['search-user-on-login', params],
        async () => {
            const response = await axiosInstance.post<IPagingResponse<IAuthResponse> | IAuthResponse>(
                REQUEST_MAPPING.AUTH + REQUEST_PATH.SIGN_IN,
                params
            )
            return response.data
        },
        {
            enabled: 'sample' in params ? !!params.sample.username : !!params.username,
        }
    )
}