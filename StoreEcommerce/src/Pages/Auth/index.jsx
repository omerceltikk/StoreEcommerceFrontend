import React, { useState } from 'react'
import Login from '../../Components/Login'
import SignUp from '../../Components/SignUp'

const Auth = () => {
  const [selectedValue, setSelectedValue] = useState('login');

  return (
    // <div className="container-fluid p-0 m-0 h-100">
    //   <div className="row p-0 m-0">
    //     <div className='p-0 m-0'>
    //       <img className='img-fluid' src="../../../assets/authmain6.jpg" alt="" />

    //     </div>

    //   </div>
    // </div>
    <div className="container-fluid p-0 m-0 ">
      <div className='mainPageSection'>
        <div className="container">
          <div className="row ">
            <div className="col-lg-6 mt-80 pt-160 ">
              <div className=' border border-1 rounded-3 p-4 border-secondary customNavbarStyle'>
                <div className="d-flex justify-content-center">
                  <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input
                      type="radio"
                      className="btn-check"
                      name="btnradio"
                      id="btnradio1"
                      value={"login"}
                      autoComplete="off"
                      checked={selectedValue === 'login'}
                      onChange={(e) => setSelectedValue(e.target.value)}
                    />

                    <label className="text-secondary border-bottom border-1 p-2 mx-2 btn rounded-3" htmlFor="btnradio1">Login</label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="btnradio"
                      id="btnradio2"
                      value={"signup"}
                      autoComplete="off"
                      checked={selectedValue === 'signup'}
                      onChange={(e) => setSelectedValue(e.target.value)}
                    />
                    <label className=" text-secondary border-bottom border-1 p-2 mx-2 btn rounded-3" htmlFor="btnradio2">Sign-Up</label>
                  </div>
                </div>
                {selectedValue == "login" && <Login />}
                {selectedValue == "signup" && <SignUp />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth