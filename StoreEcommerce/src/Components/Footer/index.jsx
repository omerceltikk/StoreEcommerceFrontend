import React, { useEffect, useState } from 'react'
import { Link, useLocation, } from 'react-router-dom'

const Footer = () => {
    const location = useLocation();
    const [currLocation, setCurrLocation] = useState(null);
    useEffect(() => {
        setCurrLocation(location.pathname);
    }, [location])
    return (
        <div className={`${currLocation == "/" ? "footerBgContainer" : ""}`}>
            <div className="container pt-5">
                <div className="row  py-80 border-top border-secondary border-1">
                    <div className="col-6 col-lg-4">
                        <div className='fs-6 fw-bold text-secondary py-2 text-decoration-underline'>
                            Site Map
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className='fs-14 fw-bold text-secondary my-1'>
                                    E-Commerce
                                </div>
                                <div className='d-flex flex-column gap-1 p-1'>
                                    <Link className='fw-semibold text-secondary text-decoration-none basketCardText' to={"/"}>
                                        Home
                                    </Link>
                                    <Link className='fw-semibold text-secondary text-decoration-none basketCardText' to={"/products"}>
                                        Products
                                    </Link>
                                    <Link className='fw-semibold text-secondary text-decoration-none basketCardText' to={"/products/man"}>
                                        Man
                                    </Link>
                                    <Link className='fw-semibold text-secondary text-decoration-none basketCardText' to={"/products/women"}>
                                        Woman
                                    </Link>
                                    <Link className='fw-semibold text-secondary text-decoration-none basketCardText' to={"/Profile"}>
                                        Profile
                                    </Link>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className='fs-14 fw-bold text-secondary my-1'>
                                    Business
                                </div>
                                <div className='d-flex flex-column gap-1 p-1'>
                                    <Link className='fw-semibold text-secondary text-decoration-none basketCardText' to={"/"}>
                                        About Us
                                    </Link>
                                    <Link className='fw-semibold text-secondary text-decoration-none basketCardText' to={"/products"}>
                                        Career
                                    </Link>
                                    <Link className='fw-semibold text-secondary text-decoration-none basketCardText' to={"/products/man"}>
                                        News
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className='fs-6 fw-bold text-secondary py-2 text-decoration-underline'>
                            Contact Us
                        </div>
                        <div className='my-1'>
                            <div className="input-group mb-3">
                                <input type="text"
                                    className={`form-control basketCardText border border-secondary ${currLocation == "/" ? " opacity-75 border-0" : "border-1"}`}
                                    placeholder="Please enter an e-mail..."
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                />
                                <span className={`input-group-text border border-secondary basketCardText ${currLocation == "/" ? " border-0 " : "border-1"}`}
                                    id="basic-addon2">
                                    @example.com
                                </span>
                            </div>
                            <div className="input-group">
                                <textarea
                                    className={`form-control basketCardText border-secondary ${currLocation == "/" ? "opacity-75 border-0" : "border-1"}`}
                                    aria-label="With textarea">
                                </textarea>
                                <span className={`input-group-text border border-secondary basketCardText ${currLocation == "/" ? " border-0" : "border-1"}`}>
                                    Message
                                </span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end mt-2">
                            <div className={`my-1 btn py-2 p-3 border border-secondary rounded-2 basketCardText align-self-end ${currLocation == "/" ? "btn-light border-0" : "border-1"}`}>Send</div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className='fs-6 fw-bold text-secondary py-2 text-decoration-underline text-end'>
                            Socials
                        </div>
                        <div className=" text-secondary mt-4 mt-lg-0 d-flex gap-4 justify-content-center justify-content-lg-end p-1">
                            <a href=""><i className="fa-brands text-secondary fa-facebook fa-lg"></i></a>
                            <a href=""><i className="fa-brands text-secondary fa-instagram fa-lg"></i></a>
                            <a href=""><i className="fa-brands text-secondary fa-twitter"></i></a>
                            <a href=""><i className="fa-brands text-secondary fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>
                <div className="row flex-column flex-lg-row align-items-lg-center py-5 border-1 border-secondary border-top">
                    <div className="col-12 col-lg-4 order-2 order-lg-first text-decoration-none text-center text-lg-start">
                        <a href="" className='text-decoration-none  me-3 text-secondary'>Terms of Service</a>
                        <a href="" className='text-decoration-none  text-secondary '>Privacy Policy</a>
                    </div>

                    <div className="col-12 col-lg-8 mt-2 mt-lg-0  order-3 order-lg-3 ">
                        <p className='display-10 text-center mb-lg-0 text-lg-end text-secondary'>This site has been created for the development phase only. It has no commercial purpose. Delevoped By:
                            <a href="" className='text-decoration-none  text-secondary fw-semibold ms-2'>omerceltikk</a>
                        </p>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Footer