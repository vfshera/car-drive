import axios from "axios";
import React, { useState, useEffect ,useRef } from "react";

import SelectInputField from "../components/form-elements/SelectInputField";
import TextAreaInputField from "../components/form-elements/TextAreaInputField";
import InputField from "../components/form-elements/InputField";

const NewChat = ({ setChatView , withUser = false , toUser={} }) => {
    const [recipients, setRecipient] = useState([]);

   const[userID,setUserID] = useState("")
   const[subject,setSubject] = useState("")
   const[message,setMessage] = useState("")


    const sendMessage = (e) =>{
        e.preventDefault();

        if((withUser || userID != "" ) && subject != "" && message != "" ){
            axios
            .post("/auth/messages",{
                recipient: withUser ? toUser.id : userID,
                subject: subject,
                message: message
            })
            .then((res) => {

                if(res.status == 201){
                    setUserID("");
                    setSubject("");
                    setMessage("");

                    setChatView(false);
                    loadRecipients();
                }

            })
            .catch((err) => console.log(err));

        }else{
            alert("check fields")
        }
    }


    const loadRecipients = () => {
        axios
            .get("/auth/messages/recipients")
            .then((res) => setRecipient(res.data.recipients))
            .catch((err) => console.log(err));
    }


    useEffect(() => {
        loadRecipients();
    }, []);

    return (
        <div className="new-message">
            <h1>Start Chatting</h1>
            <div className="create-message-form">
                <form onSubmit={sendMessage}>
                   <div className="flex justify-between">
                       
                       {withUser && (
                           <div className="input-group">
                           <label >To</label>
                           <p className="text-xl font-semibold text-gray-800 mt-3">{toUser.name}</p>
                       </div>
                       )}


                   {!withUser && (
                       <SelectInputField
                       labelText="Recepient"
                       selectOptions={recipients}
                       selectID="recepient"
                       selectName="recepient"
                       parentClasses=" w-1/2 mr-2"
                       onChange={(e) => setUserID(e.target.value)}
                   />
                   )}

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

                    <div className="form-btns">
                    <button type="submit">SEND</button>
                    <button className="cancelBtn" onClick={e => {
                        e.preventDefault();
                        setChatView(false);
                    }}>CLOSE FORM</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewChat;
