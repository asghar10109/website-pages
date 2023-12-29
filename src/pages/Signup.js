import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import emailLogo from "../assets/images/email.png"
import passwordLogo from "../assets/images/password.png"
import { Link } from 'react-router-dom'
import { signUpUser } from '../store/featureActions'
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmedPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload = {
        body: { email, password, confirmPassword },
        params: false,
        isToast: true,
      };
      setIsDisabled(true)
      const response = await dispatch(signUpUser(payload)).unwrap();
      setIsDisabled(false)
      navigate('/store/otp', { state: { id: response?.data?.data?._id, key: "signup" } });
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError)
      setIsDisabled(false)

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
            <h3 className="loginTitle mt-5 mb-2"> Create an Account!</h3>
            <p className="fontRegular mb-3">Let's get started Signup</p>
            <div className="loginField">
              <span className="inputField">
                <label className="loginLabel" htmlFor="emailInput">Email Address</label>
                <span className="input_icon"><img src={emailLogo} alt="" /></span>
                <input type="email" maxLength={35} id="emailInput" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
              </span>
            </div>
            <div className="loginField">
              <span className="inputField">
                <span className="input_icon"><img src={passwordLogo} alt="" /></span>
                <input type={showPassword ? "text" : "password"} maxLength={30} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <span className='text-white eye_icon' onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                </span>

              </span>
            </div>
            <div className="loginField">
              <span className="inputField">
                <span className="input_icon"><img src={passwordLogo} alt="" /></span>
                <input type={showConfirmPassword ? "text" : "password"} maxLength={30} placeholder="Confirm Password" onChange={(e) => setConfirmedPassword(e.target.value)} />
                <span className='text-white eye_icon' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <IoIosEye /> : <IoIosEyeOff />}
                </span>

              </span>
            </div>
            <button disabled={isDisabled} type='submit' className="cta">Signup</button>
          </form>

          <div className="d-flex align-items-center mt-5">
            <p className="bottom_link m-0">Already have an account? </p>
            <div className='ms-3'>
              <Link to="/" className="cta">Login</Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default Signup