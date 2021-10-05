import React,{useEffect} from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { refreshUser } from "../actions/AuthActions";


const SocialLogin = () => {
    const PROVIDERS = ["github", "google", "facebook"];

    const dispatch = useDispatch();

    const socialLogin = (provider) => {
        axios.get(`/social-login/authorize/${provider}/redirect`)
            .then((res) => {
                if (res.data.url) {
                    window.location.href = res.data.url;
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        dispatch(refreshUser());

        setInterval(() => {
            dispatch(refreshUser());
        }, 840000);

        window.scrollTo(0, 0);

        document.querySelector("title").text = "Car Drive | Social Login";
    }, []);

    return (
        <div className="social-login-providers-page">
            <section className="provider-buttons">
                {PROVIDERS.map((provider,index) => (
                    <button
                    key={index}
                        onClick={(e) => {
                            e.preventDefault();
                            socialLogin(provider);
                        }}
                    >
                      Login with 
                       <span>
                      <i className={`ti-${provider}`}></i> {provider}
                      </span>
                    </button>
                ))}
            </section>

            <div className="note">
                <strong>NB: </strong> Your account will be created
                automatically!
            </div>
            
        </div>
    );
};

export default SocialLogin;
