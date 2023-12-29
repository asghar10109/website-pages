import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import emailLogo from "../assets/images/email.png"
import passwordLogo from "../assets/images/password.png"
import { signinUser } from '../store/featureActions';
import { role_type } from '../constants/app-constants';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let payload = {
        body: { email, password },
        params: false,
        isToast: true,
      };
      setIsDisabled(true)
      const data = await dispatch(signinUser(payload)).unwrap()
      setIsDisabled(false)
      if (data?.data?.data?.isVerified == 0) {
        navigate("/store/otp", { state: { id: data?.data?.data?._id, key: "signup" } })
      }
      else if (data?.data?.data?.iscompleteprofile == 0) {
        navigate("/store/add-profile", { state: { id: data?.data?.data?._id } })
      }
      else {
        handleRedirect(data?.data?.data?.role_type, data?.data?.data?._id)
      }

    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError)
      setIsDisabled(false)
    }
  }

  const handleRedirect = (role, _id) => {
    if (role == role_type.store) {
      navigate("/store/products")
    }
    else if (role == role_type.pet_service) {
      navigate("/store/services")
    }
    else if (role == role_type.restaurant) {
      navigate("/store/restaurant")
    }
    else if (role == role_type.hotel) {
      navigate("/store/rooms")
    }
    else if (role == role_type.user) {
      navigate("/store/add-profile", { state: { id: _id } })
    }
  }

  return (
    <div>

      <section className="login_section">
        <div className="login_wrapper">
          <form onSubmit={handleSubmit} className="login_form">
            <div className="login_logo">
              <a href="/"><img src={require("../assets/images/logo.png")} alt="" /></a>
            </div>
            <h3 className="loginTitle mt-5 mb-2">Welcome Back!</h3>
            <p className="fontRegular mb-3">Login To Your Account</p>
            <div className="loginField">
              <span className="inputField">
                <label className="loginLabel" htmlFor="emailInput">Email Address</label>
                <span className="input_icon"><img src={emailLogo} alt="" /></span>
                <input type="email" maxLength={35} id="emailInput" placeholder="Email Address" onChange={(e) => setEmail(e?.target?.value)} />
              </span>
            </div>
            <div className="loginField">
              <span className="inputField">
                <span className="input_icon"><img src={passwordLogo} alt="" /></span>
                <input type={showPassword ? "text" : "password"} maxLength={30} placeholder="Password" onChange={(e) => setPassword(e?.target?.value)} />
                <span className='text-white eye_icon' onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                </span>
              </span>
            </div>
            <div className="remember_logSect d_flexStartBetween">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Remember me
                </label>
              </div>
              <a href="/store/forgetpassword" className="forget_link">Forgot Password?</a>
            </div>
            <button disabled={isDisabled} type='submit' className="cta">Login</button>
          </form>
          <div className="d-flex align-items-center mt-5">
            <p className="bottom_link m-0">Don't have an account? </p>
            <div className='ms-3'>
              <Link to="/store/signup" className="cta">Sign Up</Link>
            </div>
          </div>

        </div>
      </section>


      {/* <section>
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100">
              <form onSubmit={handleSubmit} className="login100-form validate-form">
                <div style={{ display: "flex", justifyContent: "center" }} className="mt-3 mb-4">
                  <div style={{ width: "50%" }} className="logo text-center ">
                    <img src={Logo} alt="logo" className="img-fluid" />
                  </div>
                </div>
                <div className="wrap-input100 validate-input" data-validate="Valid email is: a@b.c">
                  <input className="input100" type="text" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="wrap-input100 validate-input" data-validate="Enter password">
                  <span className="btn-show-pass">
                    <i className={isSecureEntry ? "fas fa-eye" : "fas fa-eye-slash"} onClick={() => { setisSecureEntry((prev) => !prev) }} />
                  </span>
                  <input className="input100" placeholder='Enter Password' type={isSecureEntry ? "password" : "text"} name="pass" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="container-login100-form-btn">
                  <div className="wrap-login100-form-btn">
                    <div className="login100-form-bgbtn" />
                    <button type='submit' className="login100-form-btn">
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}

export default Login