import React from "react";
import { Link } from "react-router-dom";

const Chats = () => {
    const messages = ["Franklin Shera", "Ann Kanyiva", "Winstone Avoze" , "Stephen Kimani"];

    return (
        <div className="chat-wrapper">
           <div className="chat-head">
           <h1>Chats</h1>
           </div>
            <div className="chats">
                {messages.map((msg, index) => (
                    <Link to="/dashboard/chat/messages">
                        <div className="chat-preview">
                        <div className="profile">
                            <div className="avatar">
                                {msg.charAt(0)}
                            </div>
                        </div>
                        <div className="info">
                            <div className="sender">
                                <h2>{msg}</h2>
                                <span>{index+1}minute ago</span>
                            </div>

                            <p className="message">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Molestiae itaque aliquid
                                possimus reprehenderit provident quidem magni
                                optio dolor minus aperiam!
                            </p>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Chats;
