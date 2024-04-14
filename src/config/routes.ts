import React from "react";
import { LazyExoticComponent } from "react";
type AuthRoutesType = {key:string,path:string,compontent:LazyExoticComponent<() => JSX.Element>}[]
type ProtectedRoutesType = {key:string,path:string,  roles:string[], compontent:LazyExoticComponent<() => JSX.Element>}[]

export const authRoutes:AuthRoutesType = [
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

export const protectedRoutes:ProtectedRoutesType = [
    {
        key:"home",
        path:"/home",
        roles:['ADMIN','USER'],
        compontent:React.lazy(()=>import('../pages/private/Dashboard'))
    },
    {
        key:"user",
        path:"/USER",
        roles:['ADMIN','USER'],
        compontent:React.lazy(()=>import('../pages/private/Users'))
    },
    {
        key:"settings",
        path:"/settings",
        roles:['ADMIN','USER'],
        compontent:React.lazy(()=>import('../pages/private/Settings'))
    },
    {
        key:"create",
        path:"/create",
        roles:['ADMIN'],
        compontent:React.lazy(()=>import('../pages/private/Settings'))
    }
    
]