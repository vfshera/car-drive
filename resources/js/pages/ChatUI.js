import React, { useEffect } from "react";
import axios from "axios";



const ChatUI = () => {
    const messages = [
        "Franklin Shera",
        "Ann Kanyiva",
        "Winstone Avoze",
        "Stephen Kimani",
        "Lynn Nafula",
        "Agnes Nzakwa",
    ];

    const homeImages = ["car-one.jpg", "car-two.jpg", "car-three.jpg"];
    const postingCount = [1, 2, 3, 4, 5];

    useEffect(() => {
        axios
            .get("/auth/messages/1")
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="chat-wrapper">
            <section className="chat-user-wrapper">
                <div className="user-chats">
                    <div className="chat-head">
                        <h1>Franklin Shera</h1>
                        <span>fshera96@gmail.com</span>
                    </div>
                    <div className="chats">
                        {messages.map((msg, index) => (
                            <div
                                className={index % 2 == 0 ? "received" : "sent"}
                            >
                                <div className="message-wrapper">
                                    <div className="sender">
                                        <h2>{msg}</h2>
                                        <span>{index + 1} minutes ago</span>
                                    </div>

                                    <p className="message">
                                        Lorem ipsum, dolor sit amet consectetur
                                        adipisicing elit. Molestiae itaque
                                        aliquid possimus reprehenderit provident
                                        quidem magni optio dolor minus aperiam!
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="message-input">
                        <input
                            type="text"
                            placeholder="Type your message here..."
                        />
                        <button>
                            {" "}
                            SEND<i className="ti-location"></i>
                        </button>
                    </div>
                </div>
                <div className="recepient-profile">
                    <div
                        className="profile-pic"
                        style={{
                            backgroundImage: `url(/storage/images/${
                                homeImages[Math.floor(Math.random() * 3)]
                            })`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="shader"></div>
                    </div>

                    <div className="messages-count">
                        <h3>Messages</h3>
                        <span>28</span>
                    </div>
                    <div className="postings">
                        <h3>Media</h3>

                        <div className="photos">
                            {postingCount.map((post, index) => (
                                <div
                                    className="photo"
                                    key={index}
                                    style={{
                                        backgroundImage: `url(/storage/images/${
                                            homeImages[
                                                Math.floor(Math.random() * 2)
                                            ]
                                        })`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ChatUI;
