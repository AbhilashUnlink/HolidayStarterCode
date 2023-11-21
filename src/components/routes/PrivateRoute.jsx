import {  Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import MiniDrawer from "../drawer/Drawer";


export default function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? <>
  <MiniDrawer>
    {children}
  </MiniDrawer>
  </> : <Navigate to="/login" />;
}
