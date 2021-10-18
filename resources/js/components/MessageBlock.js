import React, { useState } from "react";


const MessageBlock = ({ fromMe, message }) => {
    const [actions, setActions] = useState(false);

    const editMessage = () => {
        Toast.fire({
            icon: "success",
            title: "Edit Message" + message.id,
        });
    };

    const deleteMessage = () => {
        Toast.fire({
            icon: "success",
            title: "Delete Message" + message.id,
        });
    };

    return (
        <div
            className={fromMe ? "sent" : "received"}
            onDoubleClick={(e) => {
                e.preventDefault();
                setActions(!actions);
            }}
        >
            <div className="message-wrapper">
                <div className="sender">
                    <h2>{fromMe ? "You" : message.sender.name}</h2>
                    <span>{message.created_at}</span>
                </div>

                <p className="message">{message.body}</p>

                {fromMe && actions && (
                    <div className="actions">
                        <div
                            className="action-cover right-14"
                            onClick={(e) => {
                                e.preventDefault();
                                editMessage();
                            }}
                        >
                            <i className="ti-pencil text-blue-500"></i>
                        </div>
                        <div
                            className="action-cover right-0"
                            onClick={(e) => {
                                e.preventDefault();
                                deleteMessage();
                            }}
                        >
                            <i className="ti-trash text-red-500"></i>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageBlock;
