import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import LandingPage from "./components/LandingPage";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Error from "./components/Error";
import Connections from "./components/Connections";
import ConnectionInfo from "./components/ConnectionInfo";
import Requests from "./components/Requests";
import RequestInfo from "./components/RequestInfo";
import ChangePassword from "./components/ChangePassword";
import EditProfile from "./components/EditProfile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route element={<Body />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/feed" element={<Feed />} />

                <Route path="/profile" element={<Profile />} />
                <Route path="/editProfile" element={<EditProfile />} />

                <Route path="/connections" element={<Connections />} />
                <Route path="/connections/info" element={<ConnectionInfo />} />

                <Route path="/requests" element={<Requests />} />
                <Route path="/requests/info" element={<RequestInfo />} />

                <Route path="/editPassword" element={<ChangePassword />} />
              </Route>
            </Route>

            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
