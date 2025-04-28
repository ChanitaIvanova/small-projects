import { Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { JSX } from "react"

export function RequireAuth({ children }: { children: JSX.Element }) {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
    const location = useLocation()

    if (!isLoggedIn) {
        // Redirect to login, saving the place they were trying to go
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}