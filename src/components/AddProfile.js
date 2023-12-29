import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'
import { addProfile } from '../store/featureActions/index'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'
import { getProfile } from '../store/slices/userSlice'
import { role_type } from '../constants/app-constants'
import UserPlaceholder from '../assets/images/user-placeholder.png'

const AddProfile = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { id } = location.state
    const profile = useSelector(getProfile)

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [phone, setPhone] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [website, setWebsite] = useState("")
    const [address, setAddress] = useState("")
    const [type, setType] = useState("")
    const [shop_name, setShop_name] = useState("")
    const [value, setValue] = useState("")
    const [attachment, setAttachment] = useState();
    const [file, setFile] = useState([])
    const [image, setImage] = useState(null)
    const [isDisabled, setIsDisabled] = useState(false)

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;
        setFile(Array.from(selectedFiles));
    }

    function AttachmenthandleChange(e) {
        e.preventDefault();
        console.log("e.target.files[0]", e.target.files);
        setAttachment(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
    }

    const handleDelete = (index) => {
        const updatedFiles = [...file];
        updatedFiles.splice(index, 1);
        setFile(updatedFiles);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        let result, lat, lng
        var formData = new FormData();

        try {
            setIsDisabled(true)

            if (value?.value?.description) {
                result = await geocodeByAddress(value?.value?.description)
                const data = await getLatLng(result[0]);
                lat = data?.lat
                lng = data?.lng

                formData.append("lat", lat);
                formData.append("long", lng);
            }

            // const results = await geocodeByAddress(value?.value?.description)
            // const { lat, lng } = await getLatLng(results[0]);
            formData.append("_id", id);
            formData.append("firstname", firstname);
            formData.append("lastname", lastname);
            formData.append("phone", phone);
            formData.append("type", type);
            formData.append("city", city);
            formData.append("state", state);
            formData.append("shop_name", shop_name);
            formData.append("address", address);
            formData.append("website", website);
            formData.append("country", country);
            // formData.append("lat", lat);
            // formData.append("long", lng);

            formData.append("userImage", attachment);

            file?.map((item, i) => {
                if(type == "restaurant"){
                    formData.append("restaurantImage", item);
                }
                else if(type == "store"){
                    formData.append("storeImage", item);
                }
                else if(type == "pet_service"){
                    formData.append("petserviceImage", item);
                }
                else if(type == "hotel"){
                    formData.append("hotelImage", item);
                }
            });
            console.log("formData ", formData);
            let payload = {
                body: formData,
                params: false,
                isToast: true,
            };
            await dispatch(addProfile(payload)).unwrap();
            setIsDisabled(false)
            handleRedirect(type);

        }
        catch (rejectedValueOrSerializedError) {
            console.log("error ", rejectedValueOrSerializedError);
            setIsDisabled(false)
        }
    }

    const handleRedirect = (role) => {
        if (role == role_type.store) {
            navigate("/store/add-product")
        }
        else if (role == role_type.pet_service) {
            navigate("/store/add-service")
        }
        else if (role == role_type.restaurant) {
            navigate("/store/add-menu")
        }
        else if (role == role_type.hotel) {
            navigate("/store/rooms")
        }
    }

    return (
        <div className='custom-css'>
            <section className="login_section custom-create-profile">
                <div className="login_wrapper createProfile-wrapper ">
                    <form onSubmit={handleSubmit} className="login_form createProfile">
                        <div className="avatar-upload">
                            <div className="avatar-edit">
                                <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg" onChange={AttachmenthandleChange} />
                                <label htmlFor="imageUpload" className="xy-center">
                                    <img src={require("../assets/images/camera.png")} alt="img" />
                                </label>
                            </div>
                            <div className="avatar-preview">
                                <div id="imagePreview" style={{ backgroundImage: `url(${image || require('../assets/images/user-placeholder.png')})` }}>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <div className="loginField">
                                    <span className="inputField">
                                        <input type="text" maxLength={30} placeholder="First Name" onChange={(e) => setFirstname(e.target.value)} />
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="loginField">
                                    <span className="inputField">
                                        <input type="text" maxLength={30} placeholder="Last Name" onChange={(e) => setLastname(e.target.value)} />
                                    </span>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="loginField">
                                    <span className="inputField ">
                                        <PhoneInput
                                            defaultCountry="us"
                                            value={phone}
                                            onChange={(phone) => setPhone(phone)}
                                        />
                                        {/* <input type="text" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} /> */}
                                    </span>
                                </div>
                            </div>



                            <div className="col-12">
                                <div className="loginField">
                                    <span className="inputField">
                                        <select name="type" onChange={(e) => setType((e.target.value))} value={type}>
                                            <option value="stores" disabled selected >Select Business</option>
                                            <option value="store">Store</option>
                                            <option value="hotel">Hotel</option>
                                            <option value="pet_service">Pet Service</option>
                                            <option value="restaurant">Restaurant</option>
                                        </select>
                                    </span>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="loginField cs-color" style={{ color: "#fff" }}>
                                    <GooglePlacesAutocomplete
                                        apiKey="AIzaSyBmaS0B0qwokES4a_CiFNVkVJGkimXkNsk"
                                        selectProps={{
                                            value,
                                            onChange: setValue,
                                            onKeyDown :(e)=>{
                                                if (e.key === 'Backspace'){
                                                    setValue('')
                                                }
                                            },
                                            placeholder: "Select your location",
                                        }}

                                    />
                                    {/* {renderGooglePlacesAutocomplete} */}
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="loginField">
                                    <span className="inputField">
                                        <input type="text" maxLength={30} placeholder="Country" onChange={(e) => setCountry(e.target.value)} />
                                    </span>
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="loginField">
                                    <span className="inputField">
                                        <input type="text" maxLength={30} placeholder="State" onChange={(e) => setState(e.target.value)} />
                                    </span>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="loginField">
                                    <span className="inputField">
                                        <input type="text" maxLength={30} placeholder="City" onChange={(e) => setCity(e.target.value)} />
                                    </span>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="loginField">
                                    <span className="inputField">
                                        <input type="text" maxLength={30} placeholder="Pet Store Name" onChange={(e) => setShop_name(e.target.value)} />
                                    </span>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="loginField mb-4 ">
                                    <span className="inputField">
                                        <input type="url" maxLength={30} placeholder="Website" onChange={(e) => setWebsite(e.target.value)} />
                                    </span>
                                </div>
                                <small className='d-block hint'>Hint: https://www.google.com</small>
                            </div>

                            {/* <div className="col-12">
                                <div className="loginField mt-4">
                                    <span className="inputField">
                                        <input type="text" maxLength={30} placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
                                    </span>
                                </div>
                            </div> */}
                            

                            <div className="col-12">
                                <div className="addProperty_image">
                                    <div className="upload_box">
                                        <a href="#">
                                            <img src="assets/images/upload.png" alt="" />
                                        </a>
                                        <p className="smallPara text-white"  >Upload store Image</p>
                                    </div>
                                    <div className="form-group">
                                        <label />
                                        <input type="file" accept='.png, .jpg, .jpeg' className="upload-img form-control" name="images[]" multiple onChange={handleFileChange} />
                                    </div>
                                    <div className="img-thumbs img-thumbs-hidden img-preview" />
                                </div>

                                <div className="image-row">
                                    {file?.map((e, index) => (
                                        <div key={index} className="image-container">
                                            <img
                                                src={URL.createObjectURL(e)}
                                                alt={`File ${index + 1}`}
                                                className="small-image"
                                            />
                                            <span
                                                className="delete-icon"
                                                onClick={() => handleDelete(index)}
                                            >
                                                &#10006;
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button disabled={isDisabled} type='submit' className="cta">Create</button>
                    </form>
                </div>
            </section>

        </div>
    )
}

export default AddProfile