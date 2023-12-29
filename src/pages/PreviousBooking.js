
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserStatus, signinUser } from "../store/slices/userSlice"
import {useNavigate} from "react-router-dom";
import Logo from "../../src/assets/images/logo.png"
import emailLogo from "../assets/images/email.png"
import passwordLogo from "../assets/images/password.png"
import Spinner from '../components/Spinner'
import { Link, useLocation } from 'react-router-dom'

const PreviousBooking = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSecureEntry, setisSecureEntry] = useState(true)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const status = useSelector(getUserStatus)

    return (
        <>
            <div className="modal fade addProduct_Modal" id="reportModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Reason Report User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className="report_modalContent">
                                <ul>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault1b" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1b">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. dolor sit amet, consectetur
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault2b" defaultChecked />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2b">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. dolor sit amet, consectetur
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault3b" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault3b">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. dolor sit amet, consectetur
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault4b" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault4b">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. dolor sit amet, consectetur
                                            </label>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="flexRadioDefault2" id="flexRadioDefault5b" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault5b">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. dolor sit amet, consectetur
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                                <div className="userInputs">
                                    <textarea name placeholder="Description" defaultValue={""} />
                                </div>
                                <div>
                                    <a href="javascript:void(0)" className="cta">Submit</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <section className="content-section">
                    <div className="titleSect d_flexSpacebetween">
                        <h3>Previous Booking Details</h3>
                    </div>
                    <div className="roomDetail-sect ongoing_wrapper">
                        <div className="row">
                            <div className="col-12 col-lg-6 col-md-6">
                                <form action className="user-desc">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="userInputs">
                                                <label htmlFor>Category</label>
                                                <input type="text" defaultValue="Suite" />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="userInputs">
                                                <label htmlFor>Price Category</label>
                                                <input type="text" defaultValue="Price Per Day" />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="userInputs">
                                                <label htmlFor>Price</label>
                                                <input type="text" defaultValue="$20.00" />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="userInputs">
                                                <label htmlFor>Amenities</label>
                                                <ul className="Amenities">
                                                    <li>
                                                        <img src={require("../assets/images/house-building.png")} alt="" />
                                                        <span>Balcony</span>
                                                    </li>
                                                    <li>
                                                        <img src={require("../assets/images/users.png")} alt="" />
                                                        <span>Family rooms</span>
                                                    </li>
                                                    <li>
                                                        <img src={require("../assets/images/wifi.png")} alt="" />
                                                        <span>Free Wifi</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="userInputs">
                                                <label htmlFor>Price</label>
                                                <textarea name defaultValue={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pretium, augue id finibus efficitur, nisi risus elementum mi, id ultrices ex leo non felis. Duis pellentesque tincidunt orci a lobortis. Proin magna lacus, hendrerit sed felis a, tincidunt cursus mi. Donec lobortis eros ut tortor lacinia maximus. Vestibulum quis semper enim, vel maximus purus. Vivamus rhoncus porta nisi eget vestibulum. Fusce euismod ut sem sed vulputate. Vestibulum turpis eros, lacinia consequat cursus id, vulputate sit amet ante. Curabitur in sagittis erat"} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-12 col-lg-6 col-md-6">
                                <p className="paraTitle">Client Details</p>
                                <div className="clientDetail">
                                    <ul className="client_detail_lists">
                                        <li>
                                            <label htmlFor>Name</label>
                                            <span>John Smith</span>
                                        </li>
                                        <li>
                                            <label htmlFor>Adults</label>
                                            <span>01</span>
                                        </li>
                                        <li>
                                            <label htmlFor>Children ( Age 0 - 17 )</label>
                                            <span>01</span>
                                        </li>
                                        <li>
                                            <label htmlFor>Child 1</label>
                                            <span>6 years old</span>
                                        </li>
                                        <li>
                                            <label htmlFor>Status</label>
                                            <span className="statusCompleted">Completed</span>
                                        </li>
                                        <li>
                                            <label htmlFor>Date</label>
                                            <span>01-01-2023 To 02-01-2023</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="d_flexSpacebetween my-3">
                                    <p className="paraTitle">Images</p>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3">
                                        <div className="room_images">
                                            <img src={require("../assets/images/room-img-1.png")} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3">
                                        <div className="room_images">
                                            <img src={require("../assets/images/room-img-2.png")} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3">
                                        <div className="room_images">
                                            <img src={require("../assets/images/room-img-3.png")} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3">
                                        <div className="room_images">
                                            <img src={require("../assets/images/room-img-4.png")} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button data-bs-toggle="modal" data-bs-target="#reportModal" className="cta">Report User</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
            </div>
        </>

    )
}

export default PreviousBooking