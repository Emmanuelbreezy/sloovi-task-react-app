import { Navigate } from "react-router";
import { useAppSelector } from "../../redux/store/hook";
import { loginPathUrl } from "../constant";


const DefaultRoute = ({ component: RouteComponent, ...rest }:{component: () => JSX.Element;}) => {
  const { isAuth,accessToken } = useAppSelector((state:any) => state.auth.authentication); 

   if(!isAuth && accessToken === null) {
        return <Navigate to={loginPathUrl} />;
   }
   return <RouteComponent {...rest} />
};

export default DefaultRoute;

