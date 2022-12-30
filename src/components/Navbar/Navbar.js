import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const logout = () => {
        logOut();
    };
    console.log(user?.email);
    return (
        <div className="navbar justify-between bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn-ghost btn lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
                    >
                        <li>
                            <Link>Item 1</Link>
                        </li>
                        <li tabIndex={0}>
                            <Link className="justify-between">
                                Parent
                                <svg
                                    className="fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                </svg>
                            </Link>
                            <ul className="p-2">
                                <li>
                                    <Link>Submenu 1</Link>
                                </li>
                                <li>
                                    <Link>Submenu 2</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link>Item 3</Link>
                        </li>
                    </ul>
                </div>
                <Link to="/" className="btn-ghost btn text-xl normal-case">
                    WebMedia
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link to="/media">Media</Link>
                    </li>

                    <li>
                        <Link>Message</Link>
                    </li>
                    <li>
                        <Link>About</Link>
                    </li>

                    {user?.email? (
                        <li>
                            <Link onClick={logout}>Logout</Link>
                        </li>
                    ) : (
                        <li>
                            <Link to="/signin">Login</Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
