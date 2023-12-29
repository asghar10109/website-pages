import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    useNavigate
  } from "react-router-dom";


import { context } from '../../context/context';

import Logo from "../../assets/images/logo.png"
const Sidebar = () => {
    var location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    console.log(location?.pathname)
    const { toggleButton } = useContext(context);

    // const handleLogout = async () => {
    //     try {
    //       console.log("logout");  
    //       await dispatch(userLogout()).unwrap()
          
    //       navigate("/")
    //     } catch (rejectedValueOrSerializedError) {
    //       console.log(rejectedValueOrSerializedError)
    //     }
    //   }
    return (
        <>
            <aside className="sideMenu">
                <div className="logoSection">
                    <a href="index.php">
                        <img src={require("../../assets/images/logo.png")} alt="" />
                    </a>
                </div>
                <div className="all_links">
                    <ul className="url_list">
                        <li>
                            <Link to="/store/products" className="one"><img src={require("../../assets/images/icon-1.png")} alt="" /><span>Home</span></Link>
                        </li>
                        <li>
                            <Link to="#" className="one"><img src={require("../../assets/images/icon-14.png")} alt="" /><span>My Profile</span></Link>
                        </li>
                        <li>
                            <Link to="/store/Rating-Review" className="one"><img src={require("../../assets/images/icon-3.png")} alt="" /><span>Rating &amp; Reviews</span></Link>
                        </li>
                        <li>
                            <Link to="/store/terms-and-conditions" className="one"><img src={require("../../assets/images/icon-4.png")} alt="" /><span>Terms &amp; Conditions</span></Link>
                        </li>
                        <li>
                            <Link to="/store/privacy-policy" className="one"><img src={require("../../assets/images/icon-5.png")} alt="" /><span>Privacy Policy</span></Link>
                        </li>
                        <li>
                            <a  className="one"><img src={require("../../assets/images/icon-6.png")} alt="" /><span>Logout</span></a>
                        </li>
                    </ul>
                    <a href="javascript:void(0)" className="menuclose"><i className="fa-solid fa-xmark" /></a>
                </div>
            </aside>

        </>

    )
}

export default Sidebar