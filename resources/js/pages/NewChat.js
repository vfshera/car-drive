import axios from "axios";
import React, { useState, useEffect ,useRef } from "react";

import SelectInputField from "../components/form-elements/SelectInputField";
import TextAreaInputField from "../components/form-elements/TextAreaInputField";
import InputField from "../components/form-elements/InputField";

const NewChat = () => {
    const [recipients, setRecipient] = useState([]);

    const userRef = useRef("")
    const subjectRef = useRef("")
    const messageRef = useRef("")


    const sendMessage = (e) =>{
        e.preventDefault();

        if(userRef.current.value != "" && subjectRef.current.value != "" && messageRef.current.value != "" ){
            axios
            .post("/auth/messages",{
                recipient: userRef.current.value,
                subject: subjectRef.current.value,
                message: messageRef.current.value
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));


             userRef.current.value = "";
             subjectRef.current.value = "";
             messageRef.current.value  = "";
        }
    }


    useEffect(() => {
        axios
            .get("/auth/messages/recipients")
            .then((res) => setRecipient(res.data.recipients))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="new-message">
            <h1>Start Chatting</h1>
            <div className="create-message-form">
                <form onSubmit={sendMessage}>
                   <div className="flex justify-between">
                   <SelectInputField
                        labelText="Recepient"
                        selectOptions={recipients}
                        selectID="recepient"
                        selectName="recepient"
                        parentClasses=" w-1/2 mr-2"
                        ref={userRef}
                    />

                    <InputField
                        labelText="Subject"
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="Type subject here..."
                        parentClasses=" w-1/2 ml-2"
                        ref={subjectRef}

                    />
                   </div>

                    <TextAreaInputField
                        labelText="Message"
                        textareaName="message"
                        placeholder="Type your message here..."
                        id="message"
                        ref={messageRef}
                    />

                    <button type="submit">SEND</button>
                </form>
            </div>
        </div>
    );
};

export default NewChat;
