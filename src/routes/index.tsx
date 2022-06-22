import React,{lazy, Suspense, } from 'react';
import {Routes, Route} from "react-router-dom";
import { AuthenticationRoutes, DefaultPageRoutes } from './allRoutes';
import AuthRoute from './hook/authRoutes';
import DefaultRoute from './hook/defaultRoute';

const PageNotFound = lazy(() => import('../pages/ErrorPage/PageNotFound'));


export default function AllRoutes() {

    return (
        <Suspense fallback={'Loading....'}>
            <Routes>
                 {DefaultPageRoutes.map((route:any) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<DefaultRoute component={route.component} />}
                        />
                ))}

                 {AuthenticationRoutes.map(({path,component}:{path:string; component:() => JSX.Element}) => (
                        <Route
                            key={path}
                            path={path}
                            element={<AuthRoute component={component} />}
                        />
                 ))}

                   {/* { ERROR  route} */}
                   <Route path="*" element={<PageNotFound />}/>
            </Routes>
        </Suspense>
    )
}