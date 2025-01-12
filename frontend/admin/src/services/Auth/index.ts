import {IPagingResponse, IQueryRequest} from "src/types"
import {IAuthResponse} from "../types/index.ts"
import {useQuery} from "react-query"
import {axiosInstance} from "../index.ts";
import {REQUEST_MAPPING, REQUEST_PATH} from "../../constants"
import {ILoginRequest, IBaseResponse} from "src/services/types";

export const useLogin=
    (params: IQueryRequest<ILoginRequest> | ILoginRequest) => {
    return useQuery<IPagingResponse<IBaseResponse<IAuthResponse>> | IBaseResponse<IAuthResponse>>(
        ['search-user-on-login', params],
        async () => {
            const response = await axiosInstance.post<IPagingResponse<IBaseResponse<IAuthResponse>> | IBaseResponse<IAuthResponse>>(
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