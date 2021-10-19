import React, { useState } from "react";
import Swal from "sweetalert2";

import InputField from "../components/form-elements/InputField";
import TextAreaInputField from "../components/form-elements/TextAreaInputField";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");


    const contactUs = (e) =>{
        e.preventDefault();

        Swal.fire({
            icon: 'success',
            text: name + email + message
        })

        setName("")
        setEmail("")
        setMessage("")

    }

    return (
        <div className="contact-page">
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
                        textareaName="message"
                        labelText="Message"
                    />


                    <button type="submit" >SEND</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
