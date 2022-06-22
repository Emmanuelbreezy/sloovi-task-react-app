import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';

import {
    loginPathUrl,
    homePathUrl
} from './constant';
    

export const DefaultPageRoutes:{ path: string; component: any}[] = [
    { path: homePathUrl, component: Home },
];

export const AuthenticationRoutes: { path: string; component: () => JSX.Element }[] = [
    { path: loginPathUrl, component: Login },
];