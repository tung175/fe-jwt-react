import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Users from "../components/ManageUser/Users";
import NotFound from "./NotFound";
import PrivateRoutes from "./PrivateRoutes";
import Project from "../components/Project/Project";

const AppRoutes = (props) => {

    return (
        <>
        <Switch>
          <PrivateRoutes path='/users' component={Users}/>
          <PrivateRoutes path='/users' component={Project}/>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            {/* <Route path="/users">
              <Users />
            </Route>
            <Route path="/project">

            </Route> */}
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </>
    )
}

export default AppRoutes