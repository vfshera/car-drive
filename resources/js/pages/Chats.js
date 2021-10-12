import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { loadChats } from "../actions/GeneralAppActions";
import NewChat from "./NewChat";

const Chats = () => {
    const dispatch = useDispatch();

    const AppChats = useSelector((state) => state.appChats);

    const { chats } = AppChats;

    const [chatsView, setChatView] = useState(true);

    useEffect(() => {
        dispatch(loadChats());
    }, []);

    return (
        <>
            {!chatsView && <NewChat />}

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
                                                {thread.latest_message.receiver.name.charAt(
                                                    0
                                                )}
                                            </div>
                                        </div>
                                        <div className="info">
                                            <div className="sender">
                                                <h2>
                                                    {
                                                        thread.latest_message
                                                            .receiver.name
                                                    }
                                                </h2>
                                                <span>
                                                    {index + 1}minute ago
                                                </span>
                                            </div>

                                            <p className="message">
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
