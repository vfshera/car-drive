import axios from "axios";
import React, { useState } from "react";

import InputField from "../components/form-elements/InputField";
import TextAreaInputField from "../components/form-elements/TextAreaInputField";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);

    const contactUs = (e) => {
        e.preventDefault();

        axios
            .post("/inbox", {
                name: name,
                email: email,
                message: message,
            })
            .then((res) => {
                if (res.status == 201) {
                    setSent(true)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="contact-page">
           {sent ? (
               <div className="is-sent">
                   <i className="ti-check"></i>
                   <h2>Your Message Was Sent!</h2>
                   <p>We will get back to you soon!</p>
               </div>
           ) : (
                <div className="contact-form-wrapper">
                <h1>Contact Us</h1>

                <form onSubmit={contactUs}>
                    <InputField
                        labelText="Name"
                        type="text"
                        name="name"
                        id="name"
                        classes=""
                        parentClasses=""
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <InputField
                        labelText="Email"
                        type="email"
                        name="email"
                        id="email"
                        classes=""
                        placeholder="example@cardrive.com"
                        parentClasses=""
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextAreaInputField
                        onChange={(e) => setMessage(e.target.value)}
                        id="message"
                        rows="5"
                        textareaName="message"
                        labelText="Message"
                    />

                    <button type="submit">SEND</button>
                </form>
            </div>
           )}


        </div>
    );
};

export default Contact;
