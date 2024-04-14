import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "../components/routes/ProtectedRoutes";
import AuthRoutes from "../components/routes/AuthRoutes";
import { protectedRoutes } from "../config/routes";
type sessionSliceType = {
    isAuthenticated: boolean,
    token: string
}

export default function Root() {
    const sessionSlice: sessionSliceType = useSelector(state => state.sessionSlice)




    return (
        <BrowserRouter>
            <Routes >

                <Route path="/" element={<ProtectedRoutes isAuthenticated={sessionSlice.isAuthenticated} />} >
                    {
                        protectedRoutes.map(item => <Route path={item.path} key={item.key} element={<h1>Loading</h1>} />)
                    }
                </Route>
                <Route path="/" element={<AuthRoutes isAuthenticated={sessionSlice.isAuthenticated} />} />

            </Routes>
        </BrowserRouter>
    )
}
