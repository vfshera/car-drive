import React,{useEffect,useState , Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Dialog, Transition } from "@headlessui/react";

import { logoutUser , refreshUser} from "../actions/AuthActions";



const Navbar = () => {
    const dispatch = useDispatch();


    const[sessionTimer,setTimer] = useState(0)
    const [menuOpen, setMenuOpen] = useState(false);

    const authUser = useSelector((state) => state.authUser);
    const { auth, loggedInUser, loading } = authUser;


    const userTime = useSelector((state) => state.userTime);



    let toggleClasses = "ti-menu ";

    const toggleHamburger = (e) =>{
        e.preventDefault();
        setMenuOpen(!menuOpen);

        if(menuOpen){
            toggleClasses = "ti-close menu-opened"
        } else{
            toggleClasses = "ti-menu"
        }


    }



    const logout = (e) => {
        e.preventDefault();

        dispatch(logoutUser());
    };





    return (
        <div className={`navbar-wrapper car-drive-container ${auth && "user-logged-in" } ` }>
            <div className="branding">
            <img src="/storage/images/cardrive.png" alt="Car Drive Logo" />
            </div>
            <i className={`nav-toggle  ${toggleClasses}`} onClick={toggleHamburger}></i>
            <nav>
                <ul className="link-list">
                    <li>
                        <Link to="/"> Home </Link>
                    </li>

                    <li>
                        <Link to="/contact"> Contact </Link>
                    </li>

                    <li>
                        <Link to="/about"> About</Link>
                    </li>
                </ul>

                {auth ? (
                    <>
                        <ul className="link-list auth-routes">
                            <span> {loggedInUser.name}</span>

                            <li>
                                <button onClick={logout}> Logout</button>
                            </li>
                        </ul>
                    </>
                ) : (
                    <>
                        <ul className="link-list guest-routes">
                            <li>
                                <Link to="/login"> Login </Link>
                            </li>

                            <li>
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
