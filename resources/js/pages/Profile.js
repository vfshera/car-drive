import axios from "axios";
import { ErrorMessage } from "formik";
import React, { useState ,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { refreshUser } from "../actions/AuthActions";

const Profile = () => {
    const authUser = useSelector((state) => state.authUser);
    const { auth, loggedInUser, loading, social } = authUser;
    const [updateAction, setAction] = useState(0);

    const [newUsername, setUsername] = useState("");
    const [newPassword, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [updateErrors, setUpdateErrors] = useState([]);

    const checkFields = () => {
        let valid = true;

        if (passwordConfirm === "") {
            Swal.fire({
                icon: "error",
                title: "Current Pasword Field Can'not be Empty",
            });

            valid = false;
        }

        if (newPassword === "" && newUsername === "") {
            Swal.fire({
                icon: "error",
                title: "Fill Username or New Password Field",
            });

            valid = false;
        }

        return valid;
    };

    const updateProfile = () => {
        if (checkFields()) {
            let updateData = {
                current_password: passwordConfirm,
            };

            if (newUsername != "") {
                updateData.name = newUsername;
            }

            if (newPassword != "") {
                updateData.password = newPassword;
            }

            axios
                .put("/auth/update-profile", updateData)
                .then((res) => {
                    if (res.status == 200) {
                        window.location.reload();
                    }
                })
                .catch((err) => {
                    console.log(err);

                    if (err?.response?.status == 401) {
                        Swal.fire({
                            icon: "error",
                            title: err.response.data.message,
                        });
                    }

                    if (err?.response?.status == 422) {
                        setUpdateErrors(err.response.data.errors);
                    }
                });
        }
    };



    useEffect(() => {
        document.querySelector('title').text = 'CarDrive | Profile'
    }, [])

    return (
        <div className="profile-page">
            <h1>My Profile</h1>

            <div className="current-info">
                <div className="details">
                    <div className="detail">
                        <div className="title">Username</div>

                        <div className="value">{loggedInUser.name}</div>
                    </div>

                    <div className="detail">
                        <div className="title">Email</div>

                        <div className="value">{loggedInUser.email}</div>
                    </div>
                </div>

                <div className="social-accounts">
                    <h2>OAUTH Accounts </h2>

                   
                    {social?.length > 0 &&
                        social?.map((socialac) => (
                            <div className="social-account">
                                <i className={`ti-${socialac.provider}`}></i>

                                <div className="brand">{socialac.provider}</div>
                            </div>
                        ))}
                </div>
            </div>

            <div className="update-info">
                <h1>Update Info</h1>

                <div className="update-actions">
                    <div className="note">
                        <p>
                            <span>NOTE : </span>If Username or New Password is
                            left empty it will not be updated!
                        </p>
                    </div>
                </div>

                <div className="allowed-updates">
                    <div className="fields">
                        {updateAction == 0 && (
                            <div className="input-group three-fields">
                                <label htmlFor="username">Username</label>
                                {updateErrors?.username && (
                                    <div className="field-errors">
                                        {updateErrors?.username[0]}
                                    </div>
                                )}
                                <input
                                    type="text"
                                    name="username"
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            </div>
                        )}

                        <div
                            className={` input-group ${
                                updateAction == 1
                                    ? " two-fields"
                                    : "three-fields"
                            }`}
                        >
                            <label htmlFor="password">New Password</label>
                            {updateErrors?.password && (
                                <div className="field-errors">
                                    {updateErrors?.password[0]}
                                </div>
                            )}

                            <input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                            />
                        </div>

                        <div
                            className={` input-group ${
                                updateAction == 1
                                    ? " two-fields"
                                    : "three-fields"
                            }`}
                        >
                            <label htmlFor="repeat-password">
                                Current Password
                            </label>
                            <input
                                type="password"
                                onChange={(e) =>
                                    setPasswordConfirm(e.target.value)
                                }
                                name="repeat-password"
                            />
                        </div>
                    </div>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            updateProfile();
                        }}
                    >
                        Update {updateAction == 0 ? "Info" : "Password"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
