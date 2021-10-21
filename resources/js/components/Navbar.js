import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Dialog, Transition } from "@headlessui/react";

import { logoutUser, refreshUser } from "../actions/AuthActions";

const Navbar = () => {
    const dispatch = useDispatch();

    const [sessionTimer, setTimer] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [toggleClasses, setToggleClasses] = useState("ti-menu");

    const authUser = useSelector((state) => state.authUser);
    const { auth, loggedInUser, loading } = authUser;

    const userTime = useSelector((state) => state.userTime);

    useEffect(() => {
        if (menuOpen) {
            setToggleClasses("ti-close menu-opened");
        } else {
            setToggleClasses("ti-menu");
        }

    }, [menuOpen]);

    const logout = (e) => {
        e.preventDefault();

        dispatch(logoutUser());
    };

    return (
        <div
            className={`navbar-wrapper car-drive-container ${
                auth ? "user-logged-in" : ""
            }  ${menuOpen ? "mobile-nav" : "normal-nav"}`}
        >
            <div className="branding">
                <img src="/storage/images/cardrive.png" alt="Car Drive Logo" />
            </div>
            <i
                className={`nav-toggle  ${toggleClasses}`}
                onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(!menuOpen);
                }}
            ></i>
            <nav>
                <ul className="link-list">
                    <li
                        onClick={(e) => {
                            setMenuOpen(false);
                        }}
                    >
                        <Link to="/"> Home </Link>
                    </li>

                    <li
                        onClick={(e) => {
                            setMenuOpen(false);
                        }}
                    >
                        <Link to="/contact"> Contact </Link>
                    </li>

                    <li
                        onClick={(e) => {
                            setMenuOpen(false);
                        }}
                    >
                        <Link to="/about"> About</Link>
                    </li>
                </ul>

                {auth ? (
                    <>
                        <ul className="link-list auth-routes">
                            
                                <li
                                className="admin-nav-link"
                                    onClick={(e) => {
                                        setMenuOpen(false);
                                    }}
                                >
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>

                                <li
                                className="admin-nav-link"
                                    onClick={(e) => {
                                        setMenuOpen(false);
                                    }}
                                >
                                    <Link to="/dashboard/cars">Cars</Link>
                                </li>

                                <li
                                className="admin-nav-link"
                                    onClick={(e) => {
                                        setMenuOpen(false);
                                    }}
                                >
                                    <Link to="/dashboard/mycars">My Cars</Link>
                                </li>

                                <li
                                className="admin-nav-link"
                                    onClick={(e) => {
                                        setMenuOpen(false);
                                    }}
                                >
                                    <Link to="/dashboard/chats">Chats</Link>
                                </li>
                         

                            <span> <Link to="/dashboard">{loggedInUser.name}</Link></span>

                            <li
                                onClick={(e) => {
                                    setMenuOpen(false);
                                }}
                            >
                                <button onClick={logout}> Logout</button>
                            </li>
                        </ul>
                    </>
                ) : (
                    <>
                        <ul className="link-list guest-routes">
                            <li
                                onClick={(e) => {
                                    setMenuOpen(false);
                                }}
                            >
                                <Link to="/login"> Login </Link>
                            </li>

                            <li
                                onClick={(e) => {
                                    setMenuOpen(false);
                                }}
                            >
                                <Link to="/register"> Register</Link>
                            </li>
                        </ul>
                    </>
                )}
            </nav>
        </div>
    );
};

export default Navbar;
