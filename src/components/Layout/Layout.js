import React from 'react'
import Nav from './Nav'
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from '../../pages/Login';
import TermsAndConditions from '../../pages/TermsAndConditions';
import PrivacyPolicy from '../../pages/PrivacyPolicy';
import Signup from '../../pages/Signup'
import Forget from '../../pages/ForgetPassword'
import Otp from '../../pages/Otp'
import ChangePassword from '../ChangePassword';
import Product from '../../pages/Product'
import RatingReviews from '../../pages/RatingReviews'
import EditProfile from '../EditProfile'
import Profile from '../../pages/Profile'
import AddProfile from '../AddProfile';
import AddProduct from '../../pages/AddProduct';
import PublicRoute from '../../navigation/PublicRoute';
import ProtectedRoute from '../../navigation/ProtectedRoute';
import AddService from '../../pages/AddService';
import Home from '../../pages/Home';
import RestaurantBooking from '../../pages/RestaurantBooking';
import BookingRequest from '../../pages/BookingRequest';
import Setting from '../../pages/Setting';
import Chat from '../../pages/Chat';
import ServiceDetails from '../../pages/ServiceDetail';
import RoomDetails from '../../pages/RoomDetail';
import RestaurantBookingDetail from '../../pages/RestaurantBookingDetail';
import PreviousBooking from '../../pages/PreviousBooking';
import Restaurant from '../../pages/Restaurant';
import AddMenu from '../../pages/AddMenu';
import Menu from '../../pages/Menu';
import RestaurantDetails from '../../pages/RestaurantDetails';
import ServiceBooking from '../../pages/ServiceBooking';
import ServiceBookingDetail from '../../pages/ServiceBookingDetail';
import Room from '../../pages/Room';
import HotelBooking from '../../pages/HotelBooking';
import HotelBookingDetail from '../../pages/HotelBookingDetail';
const Layout = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/store/add-profile" element={<AddProfile />} />

                <Route element={<PublicRoute />}>
                    <Route path="/" element={<Login />} />
                    <Route path="/store/signup" element={<Signup />} />
                    <Route path="/store/forgetpassword" element={<Forget />} />
                    <Route path="/store/otp" element={<Otp />} />
                    <Route path="/store/changepassword" element={<ChangePassword />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route element={<><Nav /><Outlet /></>}>
                        <Route path="/store/products" element={<Product />} />
                        <Route path="/store/menus" element={<Menu />} />
                        <Route path="/store/services" exact element={<Home />} />
                        <Route path="/store/rooms" exact element={<Room />} />


                        <Route path="/store/add-product" element={<AddProduct />} />
                        <Route path="/store/add-menu" element={<AddMenu />} />
                        <Route path="/store/add-service" exact element={<AddService />} />


                        <Route path="/store/service-detail/:id" exact element={<ServiceDetails />} />
                        <Route path="/store/restaurant-detail/:id" exact element={<RestaurantDetails />} />
                        <Route path="/store/hotelroom-detail/:id" exact element={<RoomDetails />} />

                        <Route path="/store/restaurant-booking" exact element={<RestaurantBooking />} />
                        <Route path="/store/service-booking" exact element={<ServiceBooking />} />
                        <Route path="/store/hotel-booking" exact element={<HotelBooking />} />

                        <Route path="/store/restaurant-booking-detail" exact element={<RestaurantBookingDetail />} />
                        <Route path="/store/service-booking-detail" exact element={<ServiceBookingDetail />} />
                        <Route path="/store/hotel-booking-detail" exact element={<HotelBookingDetail />} />


                        <Route path="/store/edit-profile" element={<EditProfile />} />
                        <Route path="/store/profile" element={<Profile />} />
                        <Route path="/store/rating-review" element={<RatingReviews />} />
                        <Route path="/store/terms-and-conditions" element={<TermsAndConditions />} />
                        <Route path="/store/privacy-policy" element={<PrivacyPolicy />} />

                        <Route path="/store/restaurant" exact element={<Restaurant />} />
                        <Route path="/store/booking-request" exact element={<BookingRequest />} />
                        <Route path="/store/setting" exact element={<Setting />} />
                        <Route path="/store/chats" exact element={<Chat />} />
                        
                       
                        <Route path="/store/previous-bookings" exact element={<PreviousBooking />} />
                    </Route>
                </Route>

                {/* <Route path="*" element={<Navigate to="store/products" />} /> */}

            </Routes>
        </BrowserRouter>
    )
}

export default Layout