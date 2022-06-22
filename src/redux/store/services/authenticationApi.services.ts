import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../../constant';

// Headers
const authenticationApiHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json', 
};

// helper func for returning the headers and others
const createMutationRequest = ({url,method,body}:{url:string,method:string,body:any}) => ({
    url:url,
    headers:authenticationApiHeader,
    method:method,
    body:body
});


export const authenticationApi:any = createApi({
    reducerPath: 'authenticationApi',
    baseQuery: fetchBaseQuery({ baseUrl:API_BASE_URL}),
    endpoints: (builder) => ({
        signinUser: builder.mutation<void, void>({
            query: (data) => createMutationRequest({url:'/login',method:'POST', body:data})      
        }),
        

    })

})

export const { 
    useSigninUserMutation,
} =  authenticationApi;