import {useQuery} from "react-query"
import {axiosInstance} from "../index.ts";
import {REQUEST_MAPPING, REQUEST_PATH} from "../../constants"
import {ILoginRequest, IBaseResponse} from "src/services/types";

export const useLogin=
    (params: ILoginRequest) => {
    return useQuery<IBaseResponse<string>>(
        ['login', params],
        async () => {
            const response = await axiosInstance.post<IBaseResponse<string>>(
                REQUEST_MAPPING.AUTH + REQUEST_PATH.SIGN_IN,
                params
            )
            return response.data
        },
        {
            enabled: !!params.username
        }
    )
}