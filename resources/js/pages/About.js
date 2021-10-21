import React,{useEffect} from "react";

const About = () => {


    useEffect(() => {
        document.querySelector('title').text = 'CarDrive | About'
    }, [])




    return (
        <div className="about-page">
            <h1>About Page</h1>
            <div className="about-content">
                <section className="content-item">
                    <div className="explanation">
                        <p>
                            This demo website was made by <a href="https://www.linkedin.com/in/franklinshera" target="_blank"><strong>Franklin Shera</strong></a> to enable
                            users to sign-up and sign-in. And be able to post /
                            discover show rooms where the can find/view other
                            vehicles.
                            
                        </p>
                    </div>

                    <div className="tech-stack">
                        <p>Technologies Used</p>
                        <div className="stacks">
                            <div className="stack">
                                <img
                                    src="/storage/images/react.svg"
                                />
                                <p>React js</p>
                            </div>

                            <div className="stack">
                                <img
                                    src="/storage/images/redux.svg"
                                />
                                <p>Redux</p>
                            </div>

                            <div className="stack">
                                <img
                                    src="/storage/images/tailwind.svg"
                                    
                                />
                                <p>Tailwindcss</p>
                            </div>

                            <div className="stack">
                                <img
                                    src="/storage/images/jwt.svg"
                                    
                                />
                                <p>JWT</p>
                            </div>

                            <div className="stack">
                                <img
                                    src="/storage/images/laravel.svg"
                                    
                                />
                                <p>Laravel</p>
                            </div>

                            <div className="stack">
                                <img
                                    src="/storage/images/mysql.png"
                                    
                                />
                                {/* <p>MySQL</p> */}
                            </div>

                            <div className="stack">
                                <img
                                    src="/storage/images/googlemap.png"
                                    
                                />
                                {/* <p>Google Maps</p> */}
                            </div>

                            <div className="stack">
                                <img
                                    src="/storage/images/tomtom.png"
                                    
                                />
                                {/* <p>TOMTOM Maps</p> */}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
