import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import { verifyOTP, resendOtp } from '../store/featureActions';
const Otp = () => {
    const location = useLocation();
    const { id, key } = location.state
    const inputRefs = useRef([])
    const [otps, setOtp] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [timer, setTimer] = useState(60)
    const [isDisabled, setIsDisabled] = useState(false)
    const timerRef = useRef(null)

    useEffect(() => {
        timerRef.current = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                clearInterval(timerRef.current);
                // Enable the functionality to resend OTP here
            }
        }, 1000);
        return () => {
            clearInterval(timerRef.current);
        };
    }, [timer])

    const handleInputChange = (index, e) => {
        const { maxLength, value, name } = e.target;
        if (value.length >= maxLength) {
            if (inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].current.focus();
            }
        }
        const updatedOtp = { ...otps, [name]: value };
        setOtp(updatedOtp);
    }

    const createRefArray = (length) => {
        inputRefs.current = Array(length)
            .fill()
            .map((_, i) => inputRefs.current[i] || React.createRef());
    }

    const SendOtp = async (e) => {
        e.preventDefault();
        const otp = Object.values(otps).join('');
        console.log(id, "from otp ...");
        try {
            let payload = {
                body: { id, otp },
                params: false,
                isToast: true,
            };
            setIsDisabled(true)
            const response = await dispatch(verifyOTP(payload)).unwrap();
            console.log("response: ", response)
            setIsDisabled(false)
            if (key === "signup") {
                navigate('/store/add-profile', { state: { id: response?.data?.data?._id } });
            }
            else if (key === "forgetpassword") {
                navigate('/store/changepassword', { state: { id: response?.data?.data?._id } });
            }
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
            setIsDisabled(false)
        }
    }

    const handleBackspace = (index, e) => {
        const { value, name } = e.target;
        if (e.keyCode === 8 && value === '' && inputRefs.current[index - 1]) {
            e.preventDefault();
            inputRefs.current[index - 1].current.focus();
            const updatedOtp = { ...otps, [name]: '' };
            setOtp(updatedOtp);
        }
    }

    const resetOtp = () => {
        const resetOtps = {};
        inputRefs.current.forEach((ref, index) => {
            if (ref.current) {
                ref.current.value = '';
                resetOtps[`digit-${index + 1}`] = '';
            }
        });
        setOtp(resetOtps);
    }

    const resendOTP = async (e) => {
        e.preventDefault();
        try {
            let payload = {
                body: { id },
                params: false,
                isToast: true,
            };
            setIsDisabled(true)
            const response = await dispatch(resendOtp(payload)).unwrap();
            resetOtp()
            console.log("response: for resend otp  ", response)
            setIsDisabled(false)
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
            setIsDisabled(false)
        }
        setTimer(60);
    }

    createRefArray(6)
    return (
        <div>
            <section className="login_section">
                <div className="login_wrapper">
                    <form onSubmit={SendOtp} className="login_form">
                        <div className="login_logo">
                            <a href="/"><img src={require("../assets/images/logo.png")} alt="" /></a>
                        </div>
                        <h3 className="loginTitle mt-5 mb-2">OTP Verification</h3>
                        <p className="fontRegular mb-3">Enter code to verify</p>
                        <div method="get" className="digit-group pb-3" data-group-name="digits" data-autosubmit="false" autoComplete="off">
                            {Array.from({ length: 6 }, (_, index) => (
                                <input
                                    className="inputItemMain"
                                    type="text"
                                    id={`digit-${index + 1}`}
                                    name={`digit-${index + 1}`}
                                    ref={inputRefs.current[index]}
                                    onChange={(e) => handleInputChange(index, e)}
                                    onKeyDown={(e) => handleBackspace(index, e)}
                                    maxLength={1}
                                    placeholder="-"
                                    key={index}
                                />
                            ))}
                        </div>
                        <button disabled={isDisabled} type="submit" className="cta">Continue</button>
                        <div className="item">
                            <div className="timer">
                                Time remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
                            </div>
                            {timer === 0 ? (
                                <button disabled={isDisabled} className="resend-otp" onClick={resendOTP}>Resend OTP</button>
                            ) : null}
                            <svg width={160} height={160} xmlns="http://www.w3.org/2000/svg">
                                <circle id="circle" className="circle_animation" r="69.85699" cy={81} cx={81} strokeWidth={4} stroke="#1B7DFB" fill="none" />
                            </svg>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}
export default Otp