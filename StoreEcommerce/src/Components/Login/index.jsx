import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { LoginSchema } from '../../Schemas';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FetchPostMethod, RefreshToken } from '../../Redux/FetchServices';
import { useDispatch } from 'react-redux';
import { errorToastMessage, successToastMessage } from '../../Messages';
// import { FetchGetMethod, FetchPostMethod } from '../Services/FetchServices';
// import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const onSubmit = async (values) => {
        const valuesBody = {
            userName: values.username,
            password: values.password,
            userStatus: "user",
        }
        const res = await FetchPostMethod("auth/login", valuesBody).then((res) => {
            if (res.status != 200) {
                const response = RefreshToken();
                if (response.status == 200) {
                    return FetchPostMethod("auth/login".valuesBody).then((res) = res.json());
                } else {
                    navigate("/login");
                    errorToastMessage("user can not be logged in")
                }
            } else {
                return res.json();
               
            }
        })
        await localStorage.setItem("user", JSON.stringify(res));
        await successToastMessage("logged in succesfully");
        window.location.href = "/";

    }

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: LoginSchema, onSubmit
    })

    return (
        <>
            <div className='bg-transparent fill mt-3'>
                <div className="container">
                    <div className="row  justify-content-center align-items-center text-center">
                        <div className="card border-0 my-3 pb-3 bg-transparent text-secondary col-10 text-align-center" >
                            <div className="card-body">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className='form-group py-3 text-start'>
                                        <label htmlFor="username1">User Name:</label>
                                        <input
                                            id='username1'
                                            className='form-control border-secondary rounded-pill mt-3'
                                            type="username"
                                            name="username"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.username}
                                            placeholder='username...'
                                        />
                                    </div>
                                    <div className='form-group pb-3 text-start'>
                                        <label htmlFor="password1">Password:</label>
                                        <input
                                            id='password1'
                                            className='form-control border-secondary rounded-pill mt-3'
                                            type="password"
                                            name="password"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                            placeholder='password...'
                                        />
                                    </div>
                                    <div>
                                            <button type="submit" className='btn btn-outline-secondary py-2 px-4 mt-3' >
                                                Submit
                                            </button>
                                        <div>
                                        test1 Test1
                                        </div>
                                        {formik.errors.password && <div className='text-danger error'>{formik.errors.password}</div>}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login