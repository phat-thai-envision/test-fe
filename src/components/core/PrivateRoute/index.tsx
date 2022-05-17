import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthenStore } from "zustand-store/authen";

interface IPrivateRoute {
  children: React.ReactNode | React.ReactElement | JSX.Element | any;
}
const PrivateRoute = (props: IPrivateRoute) => {
  const { children } = props;
  const { isLoggedIn } = useAuthenStore();
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PrivateRoute;
