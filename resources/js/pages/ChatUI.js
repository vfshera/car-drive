import React, { useEffect, useState , useRef} from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const ChatUI = ({ match }) => {
    const [thread, setThread] = useState([]);
    const [newMsg, setNewMsg] = useState("");

    const AuthUser = useSelector((state) => state.authUser);
    const { loggedInUser } = AuthUser;

    const homeImages = ["car-one.jpg", "car-two.jpg", "car-three.jpg"];
    const postingCount = [1, 2, 3, 4, 5];

    const msgBottomRef = useRef();

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

    const getMessages = () => {
        axios.get(`/auth/messages/${match.params.threadID}`)
            .then((res) => setThread(res.data.data))
            .catch((err) => console.log(err));

            
    };

    const scrollToBottom = () => {
        msgBottomRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        getMessages();
    }, []);

    useEffect(() =>{
        if(thread.messages?.length != 0){
            scrollToBottom();
        }
    },[thread])

    return (
        <div className="chat-wrapper">
            <section className="chat-user-wrapper">
                <div className="user-chats">
                    <div className="chat-head">
                        <h1>{thread?.chat_with?.name}</h1>
                        <span>{thread?.chat_with?.email}</span>
                    </div>
                    <div className="chats">
                        {thread?.messages?.map((msg, index) => (
                            <div
                                key={index}
                                id={
                                    index == thread?.messages?.length - 1
                                        ? ""
                                        : `message-${index + 1}`
                                }
                                className={
                                    msg.receiver.id != loggedInUser.id
                                        ? "received"
                                        : "sent"
                                }
                            >
                                <div className="message-wrapper">
                                    <div className="sender">
                                        <h2>
                                            {msg.receiver.id != loggedInUser.id
                                                ? msg.receiver.name
                                                : "You"}
                                        </h2>
                                        <span>{msg.created_at}</span>
                                    </div>

                                    <p className="message">{msg.body}</p>
                                </div>
                            </div>
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
                            onKeyPress={e => {
                                (e.charCode == 13) && sendMessage();
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
                        <span>{thread?.messages?.length}</span>
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
