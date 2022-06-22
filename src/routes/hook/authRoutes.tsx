import React from "react";
import { Navigate} from 'react-router-dom';
import { homePathUrl } from "../constant";
import { useAppSelector } from '../../redux/store/hook';


const AuthRoute = ({ component: RouteComponent, ...rest }:{component: () => JSX.Element;}) => {
  const { isAuth } = useAppSelector(state => state.auth.authentication);
  return !isAuth ? <RouteComponent {...rest} /> : <Navigate to={homePathUrl} />
   
  
};

export default AuthRoute;