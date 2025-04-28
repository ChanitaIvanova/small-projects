import { ThemeProvider } from "./theme-provider";
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../store/authSlice";
import { RootState } from "../../store/store";

export function Navigation() {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    return (
        <nav className="p-2 flex justify-between bg-sky-200 dark:bg-sky-900">
            <div className="flex justify-start">
                <Link className="btn-primary" to="/">Home</Link>
            </div>

            <div className="flex justify-end">
                {!isLoggedIn ? (
                    <>
                        <Link className="btn-primary" to="/login">Login</Link>
                        <Link className="btn-primary" to="/register">Register</Link>
                    </>
                ) : (
                    <Link className="btn-primary" onClick={() => dispatch(logout())} to="/login">Logout</Link>
                )}
                <ThemeProvider />
            </div>
        </nav>
    )
}