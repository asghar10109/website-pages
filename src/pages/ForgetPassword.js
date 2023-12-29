import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {useNavigate} from "react-router-dom"
import emailLogo from "../assets/images/email.png"
import { forgetPassword } from '../store/featureActions'

const Forget = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let payload = {
                body: { email },
                params: false,
                isToast: true,
            };
            setIsDisabled(true)
            const response = await dispatch(forgetPassword(payload)).unwrap();
            setIsDisabled(false)
            navigate('/store/otp',{ state: { id: response?.data?.data?._id ,key:"forgetpassword"} });
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
            setIsDisabled(false)
        }
    }

    return (
        <div>
            <section className="login_section">
                <div className="login_wrapper">
                    <form action className="login_form">
                        <div className="login_logo">
                            <a href="/"><img src={require("../assets/images/logo.png")} alt="" /></a>
                        </div>
                        <h3 className="loginTitle mt-5 mb-2">Forgot Password?</h3>
                        <p className="fontRegular mb-3">Enter email address to get OTP</p>
                        <div className="loginField">
                            <span className="inputField">
                                <label className="loginLabel" htmlFor="emailInput">Email Address</label>
                                <span className="input_icon"><img src={emailLogo} alt="" /></span>
                                <input type="text" id="emailInput" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
                            </span>
                        </div>
                        <button disabled={isDisabled} onClick={handleSubmit} className="cta">Continue</button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Forget