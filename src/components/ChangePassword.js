import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import passwordLogo from "../assets/images/password.png"
import { useLocation } from 'react-router-dom'
import { resetPassword } from '../store/featureActions'
import { useNavigate } from "react-router-dom"
import { IoIosEye, IoIosEyeOff } from 'react-icons/io'

const ChangePassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [password, setNewPassword] = useState("")
  const [confirmPassword, setconfirmPassword] = useState("")
  const { id } = location.state
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload = {
        body: { id, password, confirmPassword },
        params: false,
        isToast: true,
      };
      setIsDisabled(true)
      const response = await dispatch(resetPassword(payload)).unwrap();
      setIsDisabled(false)
      navigate('/');
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
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
            <h3 className="loginTitle mt-5 mb-2">Reset Password</h3>
            <p className="fontRegular mb-3">Enter New Password</p>
            <div className="loginField">
              <span className="inputField">
                <span className="input_icon"><img src={passwordLogo} alt="" /></span>
                <input type={showPassword ? "text" : "password"} maxLength={30} placeholder="Password" onChange={(e) => setNewPassword(e.target.value)} />
                <span className='text-white eye_icon' onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                </span>

              </span>
            </div>
            <div className="loginField">
              <span className="inputField">
                <span className="input_icon"><img src={passwordLogo} alt="" /></span>
                <input type={showConfirmPassword ? "text" : "password"} maxLength={30} placeholder="Confirm Password" onChange={(e) => setconfirmPassword(e.target.value)} />
                <span className='text-white eye_icon' onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <IoIosEye /> : <IoIosEyeOff />}
                </span>

              </span>
            </div>
            <button disabled={isDisabled} type='submit' className="cta">Change Password</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default ChangePassword