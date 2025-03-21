import {NavLink, Link} from "react-router-dom";

export default function Header() {
    return (
        <>
            <header>
                <nav className="navbar flex w-full">
                    <ul className="flex justify-between w-[50%] mx-auto my-10 bg-blue-600">
                        <li>
                            <NavLink to="/"
                                     className={({isActive}: { isActive: boolean }) =>
                                         `transition-all ${
                                             isActive
                                                 ? "text-white"
                                                 : "hover:text-white"
                                         }`
                                     }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/products"
                                     className={({isActive}: { isActive: boolean }) =>
                                         `transition-all ${
                                             isActive
                                                 ? "text-white"
                                                 : "hover:text-white"
                                         }`
                                     }
                            >
                                Browse
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/cart"
                                     className={({isActive}: { isActive: boolean }) =>
                                         `transition-all ${
                                             isActive
                                                 ? "text-white"
                                                 : "hover:text-white"
                                         }`
                                     }
                            >
                                Cart
                            </NavLink>
                        </li>
                    </ul>
                    <Link to="/profile/exampleUser">
                        My Profile
                    </Link>
                </nav>
            </header>
        </>
    )
}