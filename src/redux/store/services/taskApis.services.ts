import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../../constant';

// Headers
const taskApisHeader = (accessToken: string) => ({
    'Authorization': `Bearer ${accessToken}` ,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
});

// helper func for returning the headers and others
const createMutationRequest = ({url,method,body,accessToken}:{url:string,method:string,body:any,accessToken:string}) => ({
    url:url,
    headers: taskApisHeader(accessToken),
    method:method,
    body:body
});

const createMutationRequestWithoutBody = ({url,method,accessToken}:{url:string,method:string,accessToken:string}) => ({
    url:url,
    headers: taskApisHeader(accessToken),
    method:method,
});

const createQueryRequest = ({url,method,accessToken}:{url:string,method:string,accessToken:string}) => ({
    url:url,
    headers:taskApisHeader(accessToken),
    method:method
});



export const taskApis:any = createApi({
    reducerPath: 'taskApis',
    baseQuery: fetchBaseQuery({ baseUrl:API_BASE_URL}),
    tagTypes: ['Task'],
    endpoints: (builder) => ({

         //Query operations for GET
        fetchAllTeamByCompanyId: builder.query<void, {companyId:string; accessToken: string}>({
            query: ({companyId,accessToken}) => createQueryRequest({url:`/team?product=outreach&company_id=${companyId}`,method:'GET',accessToken:accessToken})      
        }),
        fetchAllTask: builder.query<void, {companyId:string; accessToken: string}>({
            query: ({companyId,accessToken}) => createQueryRequest({url:`/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${companyId}`,method:'GET',accessToken:accessToken}) ,
            providesTags: ['Task']         
        }),
        fetchSingleTask: builder.query<void, {taskId:string;companyId:string; accessToken: string}>({
            query: ({taskId,companyId,accessToken}) => createQueryRequest({url:`/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${taskId}?company_id=${companyId}`,method:'GET',accessToken:accessToken}) ,
            providesTags: ['Task']      
        }),

        //Mutation operations for POST, PUT, DELETE
        addNewTask: builder.mutation<void, {data:any,accessToken:string;companyId:string}>({
            query: ({data,accessToken,companyId}) => createMutationRequest({url:`/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${companyId}`,method:'POST', body:data, accessToken:accessToken}) ,
            invalidatesTags: ['Task']     
        }),
        updateTask: builder.mutation<void, {data:any,accessToken:string;taskId:string; companyId:string}>({
            query: ({data,accessToken,taskId,companyId}) => createMutationRequest({url:`/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${taskId}?company_id=${companyId}`,method:'PUT', body:data, accessToken:accessToken}) ,
            invalidatesTags: ['Task']     
        }),

        deleteSingleTask: builder.mutation<void, {data:any,accessToken:string;taskId:string; companyId:string}>({
            query: ({accessToken,taskId,companyId}) => createMutationRequestWithoutBody({url:`/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${taskId}?company_id=${companyId}`,method:'DELETE', accessToken:accessToken}) ,
            invalidatesTags: ['Task']     
        }),
        
    })

})

export const { 
    useAddNewTaskMutation,
    useUpdateTaskMutation,
    useDeleteSingleTaskMutation,

    useFetchAllTeamByCompanyIdQuery,
    useFetchAllTaskQuery,
    useFetchSingleTaskQuery
} =  taskApis;