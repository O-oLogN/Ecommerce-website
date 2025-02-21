import {useQuery} from "@tanstack/react-query"
import {getAxiosInstance} from "../index.ts"
import {REQUEST_MAPPING, REQUEST_PATH} from "constants/Path"
import {ILoginRequest, IBaseResponse} from "services/types"

export const useLogin=
    (params: ILoginRequest) => {
    return useQuery<IBaseResponse<string>>({
        queryKey: ['login', params],
        queryFn: async () => {
            const response = await getAxiosInstance().post<IBaseResponse<string>>(
                REQUEST_MAPPING.AUTH + REQUEST_PATH.SIGN_IN,
                params
            )
            return response.data
        },
        enabled: !!params.username
    })
}