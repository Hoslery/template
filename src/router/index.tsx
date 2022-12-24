import React from "react";
import { Navigate } from "react-router-dom";
import Popular from "../pages/Popular";
import Search from "../pages/Search";
import { IRoute } from "../types/types";


export const routes: IRoute[] = [
    {path: '/popular', element: <Popular/>, exact: true},
    {path: '/search', element: <Search/>, exact: true},
    {path: '/*', element: <Navigate to="/popular" replace />, exact: true},
]
