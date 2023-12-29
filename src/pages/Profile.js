import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getProfile } from "../store/slices/userSlice"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { editProfile } from '../store/featureActions'
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '400px'
}

const Profile = () => {
    const dispatch = useDispatch()
    const profile = useSelector(getProfile)
    const center = { lat: profile?.location?.coordinates[1], lng: profile?.location?.coordinates[0] }
    const back_img = `${process.env.REACT_APP_APIURL}${profile?.coverImage}`

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBmaS0B0qwokES4a_CiFNVkVJGkimXkNsk" || process.env.REACT_APP_MAP_API
    })

    const AttachmenthandleChange = async (e) => {
        e.preventDefault();
        try {
            var formData = new FormData();
            formData.append("coverImage", e?.target?.files[0]);
            formData.append("type", profile?.role_type);
            let payload = {
                body: formData,
                params: false,
                isToast: true,
            };
            const response = await dispatch(editProfile(payload)).unwrap();
        }
        catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
        }

    }

    return (
        <div className='profile-page'>
            <section className="content-section">
                <div className="titleSect d_flexSpacebetween">
                    <h3>My Profile</h3>
                </div>
                <div className="profileSection mt-5">
                    <div className="bg_coverSect">
                        <div className="avatar-upload">
                            <div className="avatar-edit">
                                <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg" onChange={AttachmenthandleChange} />
                                <label htmlFor="imageUpload" className="xy-center">
                                    <img src={require("../assets/images/upload-blue.png")} alt="img" />

                                </label>
                                <Link to="/store/edit-profile" className="edit-profile"><img src={require("../assets/images/edit-icon.png")} alt="" /></Link>
                            </div>
                            <div className="avatar-preview">
                                <div id="imagePreview" style={{ backgroundSize: profile?.coverImage ? "cover" : "20%", backgroundImage: profile?.coverImage ? `url(${back_img})` : `url(${require('../assets/images/camera2.png')})` }}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="userProfile_detail">
                        <div className="user-detail">
                            <span className="user-img"><img src={`${process.env.REACT_APP_APIURL}${profile?.userImage}`} alt="" /></span>
                            <p className="name">{profile.firstname} {profile.lastname}</p>
                        </div>
                        <form className="user-desc">
                            <div className="row">
                                <div className="col-12 col-md-6 col-lg-6">
                                    <div className="userInputs">
                                        <label >Phone Number</label>
                                        <input type="text" readOnly defaultValue={profile.phone} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-6">
                                    <div className="userInputs">
                                        <label >Business</label>
                                        <input type="text" readOnly defaultValue={profile.role_type} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-6">
                                    <div className="userInputs">
                                        <label >State</label>
                                        <input type="text" readOnly defaultValue={profile.state} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-6">
                                    <div className="userInputs">
                                        <label >City</label>
                                        <input type="text" readOnly defaultValue={profile.city} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-6">
                                    <div className="userInputs">
                                        <label >Pet Store Name</label>
                                        <input type="text" readOnly defaultValue={profile.shop_name} />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-6">
                                    <div className="userInputs">
                                        <label >Address</label>
                                        <input type="text" readOnly defaultValue={profile.address} />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="userInputs">
                                        <label >Map Location</label>
                                        {isLoaded && <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
                                            <MarkerF
                                                position={center}
                                                onDragEnd={true}

                                            />
                                        </GoogleMap>}
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label >Store Images</label>
                                    <div className='multi-images'>
                                        {
                                            profile?.storeImage?.map((data, j) => (
                                                <img src={`${process.env.REACT_APP_APIURL}${data}`} />

                                            ))
                                        }
                                        {/* <img src={`${process.env.REACT_APP_APIURL}${data}`} />
                                    <img src={`${process.env.REACT_APP_APIURL}${data}`} />
                                    <img src={`${process.env.REACT_APP_APIURL}${data}`} /> */}
                                    </div>
                                    {/* <Swiper
                                        spaceBetween={50}
                                        slidesPerView={1}

                                    >
                                        {profile?.storeImage?.map((data, j) => (
                                            <SwiperSlide key={j} style={{ display: "flex", justifyContent: "center" }}>
                                                <img src={`${process.env.REACT_APP_APIURL}${data}`} />
                                            </SwiperSlide>
                                        ))}

                                    </Swiper > */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Profile