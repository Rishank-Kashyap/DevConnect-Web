import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from './components/Body';
import Login from "./components/Login";
import Signup from "./components/signup";
import Profile from "./components/Profile";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          <Route path="/app" element={<Body />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
