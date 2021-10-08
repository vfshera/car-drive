import React, {Fragment, useEffect, useState} from 'react'

import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {Dialog, Transition} from "@headlessui/react";
import {refreshUser} from "../actions/AuthActions";

const AdminLayout = (props) => {


    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const[sessionTimer,setTimer] = useState(0)

    const authUser = useSelector((state) => state.authUser);
    const { auth, loggedInUser, loading } = authUser;


    const userTime = useSelector((state) => state.userTime);




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

        let minutes = Math.floor(rem / 60);
        let seconds = rem - (minutes * 60);

        let remTime = `${minutes}min : ${seconds}sec`;


        if (rem < 0) {

            closeModal();

            location.reload();

            return "0min : 0sec";

        }

        if (!(rem <= 20)) {

            return remTime;

        } else {
            setIsOpen(true);

            return remTime;
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
        <div className="dash-wrapper">
            <div className="dash">
            <aside className="sidebar">

                <div className="countd">
                    Session Expires In <br/>
                    <i className="ti-alarm-clock"></i> {sessionTimer}
                </div>

                <ul className="navigation">
                    
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>

                    <li>
                        <Link to="/dashboard/cars">Cars</Link>
                    </li>

                    <li>
                        <Link to="/dashboard/mycars">My Cars</Link>
                    </li>

                    <li>
                        <Link to="/dashboard/chats">Chat</Link>
                    </li>

                </ul>
            </aside>

            <section className="admin-content">
                {props.children}
            </section>

            </div>


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
    )
}

export default AdminLayout
