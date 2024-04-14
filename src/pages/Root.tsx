import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "../components/routes/ProtectedRoutes";
import AuthRoutes from "../components/routes/AuthRoutes";
import CheckRole from '../components/routes/CheckRole'
import { protectedRoutes, authRoutes } from "../config/routes";
type sessionSliceType = {
    isAuthenticated: boolean,
    token: string
}

type userType = {
    name: string,
    surname: string
    role: string
};

export default function Root() {
    const sessionSlice: sessionSliceType = useSelector(state => state.sessionSlice)
    const userSlice: userType = useSelector(state => state.userSlice)
    return (
        <BrowserRouter>
            <Routes >

                <Route path="/" element={<ProtectedRoutes isAuthenticated={sessionSlice.isAuthenticated} />} >
                    {
                        protectedRoutes.map(item => <Route path={item.path} key={item.key} element={
                            <CheckRole roles={item.roles} userRole={userSlice.role} Component={item.component} />} />)
                    }
                </Route>
                <Route path="/" element={<AuthRoutes isAuthenticated={sessionSlice.isAuthenticated} />} >
                    {
                        authRoutes.map(item => <Route path={item.path} key={item.key} element={<item.component />} />)
                    }
                </Route>

            </Routes>
        </BrowserRouter>
    )
}
