import React,{useEffect} from "react";
import { useHistory } from 'react-router';
import { useFormik } from "formik";
import { useDispatch , useSelector} from "react-redux";
import * as Yup from "yup";

import InputField from "../components/form-elements/InputField";


import { loginUser , refreshUser } from '../actions/AuthActions'
import Loader from "../components/Loader";

const Login = () => {

    const hist = useHistory();
    const authUser = useSelector((state) => state.authUser);
    const{ auth , loggedInUser , loading} = authUser;
    const dispatch = useDispatch();


    const login = (userData) =>{

        dispatch(loginUser(userData));

     }



    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .min(3, "Eamil Cannot Be Less Than 3 Characters")
                .max(32, "Email Cannot be More than 32 Characters")
                .required("Email is Required!"),
            password: Yup.string()
                .min(3, "Password Cannot Be Less Than 6 Characters")
                .max(32, "Password Cannot be More than 32 Characters")
                .required("Password is Required!"),
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            login(values)
            resetForm()
            setSubmitting(false)
        },
    });




    
    useEffect(() => {
        
        if(auth && (JSON.stringify(loggedInUser) != '{}')){
            hist.push('/dashboard')
        }
        
     }, [loggedInUser,auth])


    
    useEffect(() => {
        dispatch(refreshUser())
     }, [])


    return (
        <div className="login-page">
            <h1>Login</h1>
           
           
            <form action="" onSubmit={formik.handleSubmit}>
                <InputField
                    labelText="Email"
                    type="email"
                    name="email"
                    id="email"
                    classes=""
                    placeholder="example@laravelreactstarter.com"
                    parentClasses=""
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    errors={
                        formik.errors.email &&
                        formik.touched.email &&
                        formik.errors.email
                    }
                />

                <InputField
                    labelText="Password"
                    type="password"
                    name="password"
                    id="password"
                    classes=""
                    placeholder="password123"
                    parentClasses=""
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    errors={
                        formik.errors.password &&
                        formik.touched.password &&
                        formik.errors.password
                    }
                />

                <button type="submit">Login</button>

            </form>
        </div>
    );
};

export default Login;
