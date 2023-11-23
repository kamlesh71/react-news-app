import { useAuthStore } from "@/auth/store/useAuthStore";
import { Link, NavLinkProps, NavLink as RouterNavLink } from "react-router-dom";
import { Button } from "./button";
import { Preference } from "@/preference/components/preference";

const NavLink = ({ children, ...props }: NavLinkProps & React.RefAttributes<HTMLAnchorElement>) => (
    <RouterNavLink className={({ isActive }) => {
        return isActive ? 'text-foreground' : 'text-foreground/60'
    }} {...props}>{children}</RouterNavLink>
)

const Header: React.FC = () => {

    const { user, logout } = useAuthStore(state => ({
        user: state.user,
        logout: state.logout,
    })); 

    return (
        <header className="bg-gray-50 h-16 flex flex-col justify-center fixed w-full z-10 top-0">
            <div className="flex justify-between items-center container">
                <h1 className="font-bold text-lg">
                    <Link to="/">
                        News App
                    </Link>
                </h1>

                <div className="flex items-end flex-col">
                    {user ? (
                        <nav className="flex md:items-center space-x-2">
                            <span className="mr-5 hidden md:inline">Hello, {user?.name}</span>
                            <Preference />
                            <Button onClick={logout}>Logout</Button>
                        </nav>
                    ) : (
                        <nav className="flex space-x-4">
                            <NavLink to="/auth/login">Login</NavLink>
                            <NavLink to="/auth/create-account">Sign up</NavLink>
                        </nav>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header;