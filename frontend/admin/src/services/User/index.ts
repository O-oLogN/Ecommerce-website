import {IPagingResponse, IQueryRequest} from "src/types"
import {useQuery} from "react-query"
import {axiosInstance} from "../index.ts";
import {REQUEST_MAPPING, REQUEST_PATH} from "../../constants"
import {ISearchUserRequest, ISearchUserResponse, IBaseResponse} from "src/services/types";

export const useSearchUser=
    (params: IQueryRequest<ISearchUserRequest>) => {
        return useQuery<IPagingResponse<IBaseResponse<ISearchUserResponse>> | IBaseResponse<ISearchUserResponse>>(
            ['search-user', params],
            async () => {
                const response = await axiosInstance.post<IPagingResponse<IBaseResponse<ISearchUserResponse>> | IBaseResponse<ISearchUserResponse>>(
                    REQUEST_MAPPING.USER + REQUEST_PATH.SEARCH_USER,
                    params
                )
                return response.data
            },
        )
    }