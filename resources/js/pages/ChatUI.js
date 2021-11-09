import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import MessageBlock from "../components/MessageBlock";

const ChatUI = ({ match }) => {
    const [thread, setThread] = useState([]);
    const [newMsg, setNewMsg] = useState("");
    const [channel, setChannel] = useState(false);
    const [isOnline, setOnline] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const AuthUser = useSelector((state) => state.authUser);
    const { loggedInUser } = AuthUser;

    const homeImages = ["car-one.webp", "car-two.webp", "car-three.webp"];

    const msgBottomRef = useRef();

    const getCarPhoto = (singleCar) => {
        if (singleCar?.photos?.length > 0) {
            return singleCar?.photos[
                Math.floor(Math.random() * (singleCar?.photos?.length - 1))
            ]?.thumbnail;
        }

        return "/storage/images/" + homeImages[Math.floor(Math.random() * 2)];
    };

    const getMainPhoto = () => {
        let carsLength = thread?.chat_with?.user_cars?.length;

        let choosenCar =
            thread?.chat_with?.user_cars[
                Math.floor(Math.random() * (carsLength - 1))
            ];

        let photosLength = choosenCar?.photos.length;

        if (photosLength > 0) {
            return choosenCar?.photos[
                Math.floor(Math.random() * (photosLength - 1))
            ]?.url;
        }

        return "/storage/images/" + homeImages[Math.floor(Math.random() * 2)];
    };

    const sendMessage = () => {
        if (newMsg != "") {
            axios
                .put(`/auth/messages/${match.params.threadID}`, {
                    message: newMsg,
                })
                .then((res) => {
                    if (res.status == 201) {
                        setNewMsg("");
                        getMessages();
                    }
                })
                .catch((err) => console.log(err));
        }
    };
    const deleteMessage = (id) => {
        if (id != null) {
            Swal.fire({
                title: "Delete This Message?",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes!",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios
                        .delete(`/auth/messages/single-msg/${id}`)
                        .then((res) => {
                            if (res.status == 200) {
                                getMessages();
                            }
                        })
                        .catch((err) => console.log(err));
                }
            });
        }
    };

    const getMessages = () => {
        axios
            .get(`/auth/messages/${match.params.threadID}`)
            .then((res) => setThread(res.data.data))
            .catch((err) => console.log(err));
    };

    const setTyping = (e) => {
        
        if(e.charCode != 13 ){            
            Echo.join(`chat.${thread.id}`).whisper("typing", { user: loggedInUser.id })
        }
    };
    

    const scrollToBottom = () => {
        msgBottomRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        document.querySelector("title").text = "CarDrive | Chat UI";
        getMessages();
    }, []);

    useEffect(() => {
        if (thread.messages?.length != 0) {
            scrollToBottom();
        }
        if (!channel && thread.id) {
            setChannel(true);

            Echo.join(`chat.${thread.id}`)
                .listen(".new-chat", (event) => {
                    getMessages();
                })
                .here((users) => {
                    users.map((user) => {
                        if (users.length == 2 && user.id != loggedInUser.id) {
                            setOnline(true);
                        }
                    });
                })
                .joining(user =>{
                    if (user.id != loggedInUser.id) {
                        setOnline(true);
                    }
                })
                .leaving(user =>{
                    if (user.id != loggedInUser.id) {
                        setOnline(false);
                    }
                })
                .listenForWhisper("typing", id => {

                    let typingTimer = null;


                    if(typingTimer){
                        clearTimeout(typingTimer)
                    }
                    
                    if(!isTyping && id != loggedInUser.id){
                        setIsTyping(true)

                        typingTimer = setTimeout(() => setIsTyping(false) , 4500)
                    }
                    
                });
        }
    }, [thread]);

    return (
        <div className="chat-wrapper">
            <section className="chat-user-wrapper">
                <div className="user-chats">
                    <div className="chat-head">
                        <div className="name-status">
                            <h1>{thread?.chat_with?.name} </h1>
                            {thread?.chat_with && (
                                <>
                                <span
                                    className={` status ${isOnline
                                        ? " active "
                                        : "inactive "}
                            `}
                                >
                                    {isOnline ? "Online" : "Offline"}
                                </span>

                                {isTyping && (
                                    <span className="typing">typing...</span>
                                )}

                                
                                </>
                            )}
                        </div>
                        <span>{thread?.chat_with?.email}</span>
                    </div>
                    <div className="chats">
                        {thread?.messages?.map((msg, index) => (
                            <MessageBlock
                                deleteMessage={deleteMessage}
                                key={index}
                                fromMe={msg.sender.id == loggedInUser.id}
                                message={msg}
                            />
                        ))}

                        <div
                            className="w-full h-8 py-4 flex justify-center items-center "
                            ref={msgBottomRef}
                        >
                            <span className="text-center italic text-xs text-gray-400 bg-gray-50 py-1 px-3 rounded-2xl">
                                Today
                            </span>
                        </div>
                    </div>

                    <div className="message-input">
                        <input
                            type="text"
                            placeholder="Type your message here..."
                            value={newMsg}
                            
                            onKeyPress={(e) => {
                                setTyping(e);
                                e.charCode == 13 && sendMessage();
                            }}
                            onChange={(e) => setNewMsg(e.target.value)}
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                sendMessage();
                            }}
                        >
                            SEND<i className="ti-location"></i>
                        </button>
                    </div>
                </div>
                <div className="recepient-profile">
                    <div
                        className="profile-pic"
                        style={{
                            backgroundImage: `url(${getMainPhoto()})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="shader"></div>
                    </div>

                    <div className="messages-count">
                        <h3>Messages</h3>
                        <span>{thread?.messages?.length}</span>
                    </div>
                    <div className="postings">
                        <div className="posting-count">
                            <h3>Cars </h3>
                            <span>{thread?.chat_with?.user_cars?.length}</span>
                        </div>

                        <div className="photos">
                            {thread?.chat_with?.user_cars?.length &&
                                thread?.chat_with?.user_cars?.map(
                                    (carPost, index) => (
                                        <Link
                                            to={`/dashboard/${carPost.id}-${carPost.slug}`}
                                            key={index}
                                        >
                                            <div
                                                className="photo"
                                                style={{
                                                    backgroundImage: `url(${getCarPhoto(
                                                        carPost
                                                    )})`,
                                                    backgroundRepeat:
                                                        "no-repeat",
                                                    backgroundSize: "cover",
                                                    backgroundPosition:
                                                        "center",
                                                }}
                                            ></div>
                                        </Link>
                                    )
                                )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ChatUI;
