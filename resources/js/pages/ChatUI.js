import React from "react";

const ChatUI = () => {
    const messages = ["Franklin Shera", "Ann Kanyiva", "Winstone Avoze" , "Stephen Kimani"];

    return (
        <div className="chat-wrapper">
           <div className="chat-head">
           <h1>Chats</h1>
           </div>
            <div className="chats">
                {messages.map((msg, index) => (
                    <div className={(index % 2 == 0) ? "received" : "sent"}>
                        
                        <div className="message-wrapper">
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
                ))}
            </div>
        </div>
    );
};

export default ChatUI;
