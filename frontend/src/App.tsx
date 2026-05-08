
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Login from "./pages/auth/login/Login.tsx";
import Register from "./pages/auth/register/Register.tsx";
import VerifyRegister from "./pages/auth/register/VerifyRegister.tsx";
import VerifyResetCode from "./pages/auth/reset-password/VerifyResetCode.tsx";
import ForgotPassword from "./pages/auth/forgot-password/ForgotPassword.tsx";
import ResetPassword from "./pages/auth/reset-password/ResetPassword.tsx";
import MainPage from "./pages/main/MainPage.tsx";
import ProfilePage from "./pages/profile/ProfilePage.tsx";
import AdminProfile from "./pages/adminProfile/AdminProfile.tsx";

function App() {


  return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify" element={<VerifyRegister />} />
                <Route path="/reset-verify" element={<VerifyResetCode />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route path="/main" element={<MainPage/>}/>

                <Route path="/profile" element={<ProfilePage/>}/>

                <Route path="/admin-profile" element={<AdminProfile/>}/>
            </Routes>
        </BrowserRouter>
  )
}

export default App
