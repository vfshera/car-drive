import React,{useEffect,useState , Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Dialog, Transition } from "@headlessui/react";

import { logoutUser , refreshUser} from "../actions/AuthActions";



const Navbar = () => {
    const dispatch = useDispatch();

    const[sessionTimer,setTimer] = useState(0)
    const [isOpen, setIsOpen] = useState(false);

    const authUser = useSelector((state) => state.authUser);
    const { auth, loggedInUser, loading } = authUser;


    const userTime = useSelector((state) => state.userTime);


    const logout = (e) => {
        e.preventDefault();

        dispatch(logoutUser());
    };


    const refreshToken = () =>{
        closeModal();

        location.reload();

        dispatch(refreshUser())
    }


    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    
    const checkAuth = (rem) => {
        if (rem < 0) {

            closeModal();

            location.reload();

            return 0;

        }

        if (!(rem <= 20)) {

            return rem;

        } else {            
            setIsOpen(true);

            return rem;
        }
    };

    useEffect(() => {
       
        if(auth){
            setInterval(() => {
                let currTime = Math.floor(Date.now() / 1000);   
    
                let remaining = (userTime.overtime * 60) - (currTime - userTime.tst);
   
                setTimer(checkAuth(remaining));
    
            }, 1000);

        
        }
        
    }, [auth])

    return (
        <div className="navbar-wrapper ">
            <span>Laravel React Starter</span>
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
                            <span><i className="ti-settings"></i> {loggedInUser.name}</span>

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






            {/* SESSION MODAL */}
            <Transition show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block  max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-bold leading-6 text-green-900"
                                >
                                    You Are About To Be Logged Out!
                                </Dialog.Title>
                                <div className="mt-3">
                                    <p className="text-sm">
                                        You have {sessionTimer} seconds to refresh
                                        your session!
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-8 py-2 text-sm font-medium text-white bg-green-600 border border-transparent hover:bg-green-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
                                        onClick={(e) =>{
                                            e.preventDefault();
                                            refreshToken();
                                        }}
                                    >
                                        Refresh
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-8  py-2 ml-5 text-sm font-medium text-white bg-red-600 border border-transparent  hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
            {/* SESSION MODAL END */}
        </div>
    );
};

export default Navbar;
