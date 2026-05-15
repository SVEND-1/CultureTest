// ============================================================
// App.tsx — исправленный
// ============================================================

import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import LoginPage           from './pages/auth/login/Login.tsx';
import RegisterPage        from './pages/auth/register/Register';
import VerifyRegister from "./pages/auth/register/VerifyRegister";
import VerifyResetCode from "./pages/auth/reset-password/VerifyResetCode.tsx";
import ForgotPasswordPage  from './pages/auth/forgot-password/ForgotPassword';
import ResetPasswordPage   from './pages/auth/reset-password/ResetPassword';

import MainPage            from './pages/main/MainPage.tsx';
import ProfilePage         from './pages/profile/ProfilePage';

import AdminProfile        from './pages/adminProfile/AdminProfile';
import AdminOpenProfile    from './pages/adminOpenProfile/AdminOpenProfile';

import TestPage            from './pages/test/TestPage';
import CreateTestPage      from './pages/createTest/CreateTestPage';




const ProtectedLayout = () => {
    const token = localStorage.getItem('token');
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicLayout = () => {
    const token = localStorage.getItem('token');
    return token ? <Navigate to="/" replace /> : <Outlet />;
};


const App = () => (
    <BrowserRouter>
        <Routes>
            {/* Публичные роуты */}
            <Route element={<PublicLayout />}>
                <Route path="/login"            element={<LoginPage />} />
                <Route path="/register"         element={<RegisterPage />} />
                <Route path="/verify-register"  element={<VerifyRegister />} />
                <Route path="/verify-reset"     element={<VerifyResetCode />}/>
                <Route path="/forgot-password"  element={<ForgotPasswordPage />} />
                <Route path="/reset-password"   element={<ResetPasswordPage />} />
            </Route>

            {/* Защищённые роуты */}
            <Route element={<ProtectedLayout />}>
                <Route path="/"                         element={<MainPage />} />
                <Route path="/profile"                  element={<ProfilePage />} />
                <Route path="/admin-profile"            element={<AdminProfile />} />
                <Route path="/admin-open-profile/:userId" element={<AdminOpenProfile />} />
                <Route path="/test/:id"                 element={<TestPage />} />
                <Route path="/create-test"              element={<CreateTestPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </BrowserRouter>
);

export default App;