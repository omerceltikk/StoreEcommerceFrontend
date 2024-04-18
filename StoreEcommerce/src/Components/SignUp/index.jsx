import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik';
import { SignupSchema } from '../../Schemas';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FetchPostMethod } from '../../Redux/FetchServices';
import { ToastContainer, toast } from 'react-toastify';
import { errorToastMessage } from '../../Messages';

const SignUp = () => {

    const onSubmit = async (values) => {
        const valuesBody = {
            userName: values.username,
            password: values.password,
            userStatus: "user",
        }
        const response = await FetchPostMethod("auth/register", valuesBody).then((res) => {
            if (res.status != 200) {
                errorToastMessage("username already in use")
                        } else {
                return res.json();
            }
        })
        await localStorage.setItem("user", JSON.stringify(response));
        await console.log(response)
         window.location.href = "/";

    }

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: SignupSchema, onSubmit
    })

    return (
        <>
            <ToastContainer />
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
                                    <div className='form-group pb-3 text-start'>
                                        <label htmlFor="password2">Confirm Password:</label>
                                        <input
                                            id='password2'
                                            className='form-control border-secondary rounded-pill mt-3'
                                            type="password"
                                            name="confirmPassword"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.confirmPassword}
                                            placeholder='password...'
                                        />
                                    </div>
                                    <div>
                                        <button type="submit" className='btn btn-outline-secondary py-2 px-4 mt-3' >
                                            Submit
                                        </button>
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

export default SignUp