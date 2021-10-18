import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'


function Dashboard() {
    const authUser = useSelector((state) => state.authUser);
    const { auth, loggedInUser, loading , stats} = authUser;

    useEffect(() => {}, []);

    return (
        <div className="dashboard-page">
            <h1>Welcome Back {loggedInUser.name}</h1>
            <section className="dash-items">

                <Link to="/dashboard/cars">
                <div className="item-card">
                    <i className="ti-car"></i>
                    <p>Cars</p>
                    <span>{stats.cars}</span>
                </div>
                </Link>
                <Link to="/dashboard/mycars">

                <div className="item-card">
                    <i className="ti-crown"></i>
                    <p>My Cars</p>
                    <span>{stats.mycars}</span>

                </div>
</Link>
                <Link to="/dashboard/chats">
                <div className="item-card">
                    <i className="ti-comments"></i>
                    <p>Messages</p>
                    <span>{stats.messages}</span>

                </div>
                </Link>



            </section>
        </div>
    );
}

export default Dashboard;
