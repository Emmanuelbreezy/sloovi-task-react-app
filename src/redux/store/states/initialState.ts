interface AuthenticationStateType {
    accessToken: string | null;
    companyId: string | null;
    userId: string | null
    isAuth: boolean;
    name: string | null
}


export const AuthenticationState:AuthenticationStateType = {
    accessToken: null,
    companyId: null,
    userId: null,
    isAuth: false,
    name: null
}
