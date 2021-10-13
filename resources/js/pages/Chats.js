import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { loadChats } from "../actions/GeneralAppActions";
import NewChat from "./NewChat";

const Chats = () => {
    const dispatch = useDispatch();

    const AppChats = useSelector((state) => state.appChats);

    const AuthUser = useSelector((state) => state.authUser);
    const { loggedInUser } = AuthUser;


    const { chats } = AppChats;

    const [chatsView, setChatView] = useState(true);

    useEffect(() => {
        dispatch(loadChats());
    }, []);

    return (
        <>
            {!chatsView && <NewChat setChatView={setChatView} />}

            {chatsView && (
                <div className="chat-wrapper">
                    <div className="chat-head chats-home">
                        <h1>Chats</h1>
                        <button
                            className="star-messaging"
                            onClick={(e) => {
                                e.preventDefault();
                                setChatView(false);
                            }}
                        >
                            Create Message
                        </button>
                    </div>
                    <div className="chats">
                        {chats.length != 0 &&
                            chats?.map((thread, index) => (
                                <Link to={`/dashboard/chat/${thread.id}/messages`} key={index}>
                                    <div className="chat-preview">
                                        <div className="profile">
                                            <div className="avatar">
                                                {thread?.messages_count}
                                            </div>
                                        </div>
                                        <div className="info">
                                            <div className="sender">
                                                <h2>
                                                    {(thread.latest_message.receiver.id == loggedInUser.id) ? thread.latest_message.sender.name : thread.latest_message.receiver.name }
                                                </h2>
                                                <span>
                                                    {thread.latest_message.created_at}
                                                </span>
                                            </div>

                                            <p className="message">
                                                 <span className="uppercase italic font-semibold mr-1">
                                                     {(thread.latest_message.receiver.id == loggedInUser.id) ? "You : " : thread.latest_message.receiver.name.split(" ")[0] +" : " }
                                                     </span>
                                                 {thread.latest_message.body}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Chats;
