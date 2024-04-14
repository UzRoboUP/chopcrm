import React from "react";
import { Navigate } from "react-router-dom";
type CheckRoleType = { Component: React.ComponentType, userRole: string, roles: string[] }
const CheckRole = ({ Component, userRole, roles }: CheckRoleType) => {
    return roles.some(item => item === userRole) ? <Component /> : <Navigate replace to="/home" />
}
export default CheckRole;