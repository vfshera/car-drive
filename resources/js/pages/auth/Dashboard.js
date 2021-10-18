import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Dashboard() {
    const authUser = useSelector((state) => state.authUser);
    const { auth, loggedInUser, loading , stats} = authUser;

    useEffect(() => {}, []);

    return (
        <div className="dashboard-page">
            <h1>Welcome Back {loggedInUser.name}</h1>
            <section className="dash-items">

                
                <div className="item-card">
                    <i className="ti-car"></i>
                    <p>Cars</p>
                    <span>{stats.cars}</span>
                </div>

                <div className="item-card">
                    <i className="ti-crown"></i>
                    <p>My Cars</p>
                    <span>{stats.mycars}</span>

                </div>

                <div className="item-card">
                    <i className="ti-comments"></i>
                    <p>Messages</p>
                    <span>{stats.messages}</span>

                </div>



            </section>
        </div>
    );
}

export default Dashboard;
