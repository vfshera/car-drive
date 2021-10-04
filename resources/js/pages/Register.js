import React,{useEffect} from 'react'
import { useHistory } from 'react-router';
import { useDispatch , useSelector} from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import axios from 'axios'


import InputField from "../components/form-elements/InputField";


import {  refreshUser } from '../actions/AuthActions'


const Register = () => {
 
    const hist = useHistory();
    const authUser = useSelector((state) => state.authUser);
    const{ auth , loggedInUser , loading} = authUser;
    const dispatch = useDispatch();

    const register = (formData) =>{
        
       axios.post('/register', formData)
        .then(res => {
            if(res.status == 201){

                hist.push('/login')

            }
        })
        .catch(err =>{
            console.log(err);
        })
    }


    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, "Name Cannot Be Less Than 3 Characters")
                .max(32, "Name Cannot be More than 32 Characters")
                .required("Name is Required!"),
            email: Yup.string()
                .min(3, "Emial Cannot Be Less Than 3 Characters")
                .max(32, "Email Cannot be More than 32 Characters")
                .required("Email is Required!"),
            password: Yup.string()
                .min(3, "Password Cannot Be Less Than 6 Characters")
                .max(32, "Password Cannot be More than 32 Characters")
                .required("Password is Required!"),
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            register(values)
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
        <div className="register-page">
            <h1>Register</h1>
            <form action="" onSubmit={formik.handleSubmit}>
                <InputField
                    labelText="Name"
                    type="text"
                    name="name"
                    id="name"
                    classes=""
                    placeholder="User Name"
                    parentClasses=""
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    errors={
                        formik.errors.name &&
                        formik.touched.name &&
                        formik.errors.name
                    }
                />
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

                <button type="submit">Register</button>

            </form>
        </div>
    )
}

export default Register
