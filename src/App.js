import {
  Route,
  Routes,
} from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Home from "./pages/common/Home";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import { Announcement } from "@mui/icons-material";
import { PrivatePath, PublicPath } from "./constants/routes.c";
import Profile from "./pages/common/Profile";
import CreateEmployee from "./pages/common/CreateEmployee";
import EmployeesData from "./pages/common/EmployeesData";
import CreateLeave from "./pages/common/CreateLeave";
import LeavesList from "./pages/common/LeavesList";


const App = () => {
  return (
    <>
      <Routes>
        <Route
          path={PublicPath.login}
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path={PrivatePath.home}
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path={PrivatePath.announcement}
          element={
            <PrivateRoute>
              <Announcement />
            </PrivateRoute>
          }
        />
        <Route
          path={PrivatePath.profile}
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path={PrivatePath["create-employee"]}
          element={
            <PrivateRoute>
              <CreateEmployee />
            </PrivateRoute>
          }
        />
        <Route
          path={PrivatePath.employees}
          element={
            <PrivateRoute>
              <EmployeesData />
            </PrivateRoute>
          }
        />
        <Route
          path={PrivatePath["create-leave"]}
          element={
            <PrivateRoute>
              <CreateLeave />
            </PrivateRoute>
          }
        />
        <Route
          path={PrivatePath.leaves}
          element={
            <PrivateRoute>
              <LeavesList />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};
export default App;
