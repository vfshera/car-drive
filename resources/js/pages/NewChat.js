import axios from "axios";
import React, { useState, useEffect ,useRef } from "react";

import SelectInputField from "../components/form-elements/SelectInputField";
import TextAreaInputField from "../components/form-elements/TextAreaInputField";
import InputField from "../components/form-elements/InputField";

const NewChat = ({setChatView}) => {
    const [recipients, setRecipient] = useState([]);

   const[userID,setUserID] = useState("")
   const[subject,setSubject] = useState("")
   const[message,setMessage] = useState("")


    const sendMessage = (e) =>{
        e.preventDefault();

        if(userID != "" && subject != "" && message != "" ){
            axios
            .post("/auth/messages",{
                recipient: userID,
                subject: subject,
                message: message
            })
            .then((res) => {

                if(res.status == 201){
                    setUserID("");
                    setSubject("");
                    setMessage("");

                    setChatView(false);
                }

            })
            .catch((err) => console.log(err));

        }else{
            alert("check fields")
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
                        onChange={(e) => setUserID(e.target.value)}
                    />

                    <InputField
                        labelText="Subject"
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="Type subject here..."
                        parentClasses=" w-1/2 ml-2"
                        onChange={(e) => setSubject(e.target.value)}

                    />
                   </div>

                    <TextAreaInputField
                        labelText="Message"
                        textareaName="message"
                        placeholder="Type your message here..."
                        id="message"
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <button type="submit">SEND</button>
                </form>
            </div>
        </div>
    );
};

export default NewChat;
