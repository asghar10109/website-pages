import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import sideBar from '../../components/Layout/Sidebar'
import { context } from '../../context/context';
// import leftMenu from '../../../public/assets/images/left-menu.png'
import { useDispatch, useSelector } from 'react-redux'
// import { userLogout, getProfile } from "../../store/slices/userSlice"
import {
  useNavigate
} from "react-router-dom";
import ChangePassword from '../ChangePassword';
import Modal from 'react-modal';
import Tooltip from '@mui/material/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css';
import { userLogout } from '../../store/featureActions';
import { getProfile, setProducts, setSearchText } from "../../store/slices/userSlice"
import { role_type } from '../../constants/app-constants';

Modal.setAppElement('#root');

const Nav = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const profile = useSelector(getProfile)
  const { SetToggleButton } = useContext(context);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState()
  const { products, allProducts } = useSelector((state) => state.users)

  const handleLogout = async () => {
    try {
      const response = await dispatch(userLogout({})).unwrap()
      navigate("/")
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError)
    }
  }

  function viewModal(item, type) {
    setIsOpen(true);
    setModalType(type)
    if (type == "notification") {
    }
  }

  const handleFilterChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm) {
      const filteredProducts = allProducts?.filter((product) => {
        return product.product_name.toLowerCase().includes(searchTerm)
      });
      dispatch(setProducts(filteredProducts))
    }
    else {
      dispatch(setProducts(allProducts))
    }
  }

  const StoreLinks = () => {
    return (
      <>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/products" className="one"><img src={require("../../assets/images/icon-1.png")} alt="" /><span>Home</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/profile" className="one"><img src={require("../../assets/images/icon-14.png")} alt="" /><span>My Profile</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/rating-review" className="one"><img src={require("../../assets/images/icon-3.png")} alt="" /><span>Rating &amp; Reviews</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/terms-and-conditions" className="one"><img src={require("../../assets/images/icon-4.png")} alt="" /><span>Terms &amp; Conditions</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/privacy-policy" className="one"><img src={require("../../assets/images/icon-5.png")} alt="" /><span>Privacy Policy</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleLogout} className="one"><img src={require("../../assets/images/icon-6.png")} alt="" /><span>Logout</span></Link>
        </li>

      </>
    )
  }

  const ServiceLinks = () => {
    return (
      <>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/services" className="one"><img src={require("../../assets/images/icon-1.png")} alt="" /><span>Home</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/service-booking" className="one"><img src={require("../../assets/images/icon-13.png")} alt="" /><span>My Bookings</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/profile" className="one"><img src={require("../../assets/images/icon-14.png")} alt="" /><span>My Profile</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/rating-review" className="one"><img src={require("../../assets/images/icon-3.png")} alt="" /><span>Rating &amp; Reviews</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/booking-request" className="one"><img src={require("../../assets/images/icon-11.png")} alt="" /><span>Booking Requests</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/chats" className="one"><img src={require("../../assets/images/icon-10.png")} alt="" /><span>Messages</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/setting" className="one"><img src={require("../../assets/images/settings.png")} alt="" /><span>Setting</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleLogout} className="one"><img src={require("../../assets/images/icon-6.png")} alt="" /><span>Logout</span></Link>
        </li>

      </>
    )
  }

  const RestaurantLinks = () => {
    return (
      <>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/restaurant" className="one"><img src={require("../../assets/images/icon-1.png")} alt="" /><span>Home</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/restaurant-booking" className="one"><img src={require("../../assets/images/icon-13.png")} alt="" /><span>My Bookings</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/profile" className="one"><img src={require("../../assets/images/icon-14.png")} alt="" /><span>My Profile</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/menus" className="one"><img src={require("../../assets/images/icon-12.png")} alt="" /><span>Restaurant Menu</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/rating-review" className="one"><img src={require("../../assets/images/icon-3.png")} alt="" /><span>Rating &amp; Reviews</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/booking-request" className="one"><img src={require("../../assets/images/icon-11.png")} alt="" /><span>Booking Requests</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/chats" className="one"><img src={require("../../assets/images/icon-10.png")} alt="" /><span>Messages</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/setting" className="one"><img src={require("../../assets/images/settings.png")} alt="" /><span>Setting</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleLogout} className="one"><img src={require("../../assets/images/icon-6.png")} alt="" /><span>Logout</span></Link>
        </li>

      </>
    )
  }

  const HotelLinks = () => {
    return (
      <>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/rooms" className="one"><img src={require("../../assets/images/icon-1.png")} alt="" /><span>Home</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/hotel-booking" className="one"><img src={require("../../assets/images/icon-13.png")} alt="" /><span>My Bookings</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/profile" className="one"><img src={require("../../assets/images/icon-14.png")} alt="" /><span>My Profile</span></Link>
        </li>
       
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/rating-review" className="one"><img src={require("../../assets/images/icon-3.png")} alt="" /><span>Rating &amp; Reviews</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/booking-request" className="one"><img src={require("../../assets/images/icon-11.png")} alt="" /><span>Booking Requests</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/chats" className="one"><img src={require("../../assets/images/icon-10.png")} alt="" /><span>Messages</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" to="/store/setting" className="one"><img src={require("../../assets/images/settings.png")} alt="" /><span>Setting</span></Link>
        </li>
        <li>
          <Link data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleLogout} className="one"><img src={require("../../assets/images/icon-6.png")} alt="" /><span>Logout</span></Link>
        </li>
      </>
    )
  }

  const showSearch = () => {
    let urls = ['/store/products']
    if (urls?.includes(location?.pathname)) {
      return 'd-block'
    }
    else {
      return 'd-none'
    }
  }

  return (
    <>
      <div>
        <div className="modal fade addProduct_Modal" id="notificationModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Notification</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
                <div className="notification_wrapper">
                  {/* <div className="notifications">
                    <div className="d_flexSpacebetween">
                      <p className="prod_name">lorem ipsum dollar set</p>
                      <p className="price"><small>2 hrs ago</small></p>
                    </div>
                    <p className="prodDesc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit, dolores blanditiis tenetur aliquam ab nemo. Beatae magni impedit error fuga.</p>
                  </div>
                  <div className="notifications">
                    <div className="d_flexSpacebetween">
                      <p className="prod_name">lorem ipsum dollar set</p>
                      <p className="price"><small>2 hrs ago</small></p>
                    </div>
                    <p className="prodDesc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit, dolores blanditiis tenetur aliquam ab nemo. Beatae magni impedit error fuga.</p>
                  </div>
                  <div className="notifications">
                    <div className="d_flexSpacebetween">
                      <p className="prod_name">lorem ipsum dollar set</p>
                      <p className="price"><small>2 hrs ago</small></p>
                    </div>
                    <p className="prodDesc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit, dolores blanditiis tenetur aliquam ab nemo. Beatae magni impedit error fuga.</p>
                  </div>
                  <div className="notifications">
                    <div className="d_flexSpacebetween">
                      <p className="prod_name">lorem ipsum dollar set</p>
                      <p className="price"><small>2 hrs ago</small></p>
                    </div>
                    <p className="prodDesc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit, dolores blanditiis tenetur aliquam ab nemo. Beatae magni impedit error fuga.</p>
                  </div> */}
                  No Notifications found
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header className="header-bar d_flexSpacebetween">
        <div className="header_left d_flexCenterGap">
          <div className="side-toggle">
            <Link to="#" className="toggle-btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" role="button" aria-controls="offcanvasExample">
              <FontAwesomeIcon icon={faBars} />
            </Link>
          </div>

          <div className={`searchSect ${showSearch()} `}>
            <div className="searchField">
              <input type="text" placeholder="Search" onChange={handleFilterChange} />
              <button type="button"><img src={require("../../assets/images/search.png")} alt="" /></button>
            </div>
          </div>
        </div>

        <div className="header_right d_flexCenterGap">

          <div className="notificationSect">
            <Link to="#" data-bs-toggle="modal" data-bs-target="#notificationModal" onClick={() => viewModal(null, "notification")}><img src={require("../../assets/images/bell-icon.png")} alt="" /></Link>
          </div>

          <div className="userProfile_sect">
            <Link to="/store/profile">
              <img className='w-100 h-100' src={`${process.env.REACT_APP_APIURL}${profile.userImage}`} alt="" />
            </Link>
          </div>

        </div>

      </header>

      <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <aside className="sideMenu">
          <div className="logoSection">
            <Link to="/">
              <img src={require("../../assets/images/logo.png")} alt="" />
            </Link>
          </div>
          <div className="all_links">
            <ul className="url_list">
              {
                profile?.role_type == role_type.pet_service ?
                  <ServiceLinks />
                  :
                  profile?.role_type == role_type.store ?
                    <StoreLinks />
                    :
                    profile?.role_type == role_type.restaurant ?
                      <RestaurantLinks />
                      :
                      <HotelLinks />
              }
            </ul>
            <Link className="menuclose" data-bs-dismiss="offcanvas" aria-label="Close"><FontAwesomeIcon icon={faXmark} /></Link>
          </div>
        </aside>
      </div>

    </>
  )
}

export default Nav