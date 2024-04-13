import React from "react";
export const authRoutes = [
    {
        key:"login",
        path:"/login",
        compontent:React.lazy(()=>import('../pages/auth/Login'))
    },
    {
        key:"register",
        path:"/register",
        compontent:React.lazy(()=>import('../pages/auth/Register'))
    },
]

export const protectedRoutes = [
    {
        key:"home",
        path:"/",
        role:['admin','user'],
        compontent:React.lazy(()=>import('../pages/private/Dashboard'))
    },
    {
        key:"user",
        path:"/user",
        role:['admin','user'],
        compontent:React.lazy(()=>import('../pages/private/Users'))
    },
    {
        key:"settings",
        path:"/settings",
        role:['admin','user'],
        compontent:React.lazy(()=>import('../pages/private/Settings'))
    }
]