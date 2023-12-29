import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../store/slices/userSlice'
import { useLocation, useNavigate } from "react-router-dom"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'
import { editProfile } from '../store/featureActions'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'

const EditProfile = () => {
    const profile = useSelector(getProfile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [phone, setPhone] = useState("")
    const [state, setState] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [website, setWebsite] = useState("")
    const [address, setAddress] = useState("")
    const [type, setType] = useState("")
    const [long, setLong] = useState()
    const [lat, setLat] = useState()
    const [shop_name, setShop_name] = useState("")
    const [value, setValue] = useState("")
    const [attachment, setAttachment] = useState();
    const [file, setFile] = useState([])
    const [image, setImage] = useState(null);

    const [data, setData] = useState({
        name:"",
        email:""
    })

    const handleFileChange = (e) => {
        const selectedFiles = e.target.files;
        setFile(Array.from(selectedFiles));
    }

    function AttachmenthandleChange(e) {
        e.preventDefault();
        const selectedImage = e.target.files[0];
        setAttachment(selectedImage);
        setImage(URL.createObjectURL(selectedImage));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let result, lat, lng
        var formData = new FormData();

        try {
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
                formData.append("storeImage", item);
            });
            let payload = {
                body: formData,
                params: false,
                isToast: true,
            };
            await dispatch(editProfile(payload)).unwrap();
            navigate('/store/profile');
        }
        catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
        }
    }

    const handleDelete = (index) => {
        const updatedFiles = [...file];
        updatedFiles.splice(index, 1);
        setFile(updatedFiles);
    }

    useEffect(() => {
        if (profile) {
            setFirstname(profile?.firstname)
            setLastname(profile?.lastname)
            setPhone(profile?.phone)
            setState(profile?.state)
            setCity(profile?.city)
            setCountry(profile?.country)
            setWebsite(profile?.website)
            setAddress(profile?.address)
            setType(profile?.role_type)
            setLong(profile?.location?.coordinates[0])
            setLat(profile?.location?.coordinates[1])
            setShop_name(profile?.shop_name)
        }
    }, [profile])

    return (
        <div className='custom-css'>
            <section className="content-section ">
                <div className="titleSect d_flexSpacebetween">
                    <h3>Edit Profile</h3>
                </div>
                <div className="editProfile-section">
                    <form onSubmit={handleSubmit} className="login_form createProfile">
                        <div className="avatar-upload">
                            <div className="avatar-edit">
                                <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg" onChange={AttachmenthandleChange} />
                                <label htmlFor="imageUpload" className="xy-center">
                                    <img src={require("../assets/images/upload.png")} alt="img" />
                                </label>
                            </div>
                            <div >
                                <p className="smallPara text-white">{attachment?.name}</p>
                            </div>
                            <div className="avatar-preview" style={{ borderRadius: "50%", overflow: "hidden" }}>
                                <img id="imagePreview" style={{ objectFit: "cover", objectPosition: "cover" }} className='w-100 h-100' src={image ? image : `${process.env.REACT_APP_APIURL}${profile?.userImage}`} alt="img" />
                                {/* <div id="imagePreview" style={{ backgroundImage: `url(${image || require('../assets/images/profile-bg.png')})` }}></div> */}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="loginField">
                                    <span className="inputField">
                                        <input className='text-dark' type="text" maxLength={30} placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="loginField">
                                    <span className="inputField">
                                        <input type="text" placeholder="Last Name" maxLength={30} value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6">
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
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="loginField">
                                    <span className="inputField">
                                        <select name="type" onChange={(e) => setType((e.target.value))} value={type}>
                                            <option value="" selected disabled>Select Business</option>
                                            <option value="store">Store</option>
                                            <option value="hotel">Hotel</option>
                                            <option value="pet_service">Pet Service</option>
                                            <option value="restaurant">Restaurant</option>
                                        </select>
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="loginField">
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
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="loginField">
                                    <span className="inputField">
                                        <input type="text" placeholder="State" maxLength={30} value={state} onChange={(e) => setState(e.target.value)} />
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="loginField">
                                    <span className="inputField">
                                    <input type="text" placeholder="City" maxLength={30} value={city} onChange={(e) => setCity(e.target.value)} />

                                    </span>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="loginField">
                                    <span className="inputField">
                                        <input type="text" placeholder="Pet Store Name" maxLength={30} value={shop_name} onChange={(e) => setShop_name(e.target.value)} />
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="loginField">
                                    <span className="inputField">
                                        <input type="url" placeholder="Website" maxLength={30} value={website} onChange={(e) => setWebsite(e.target.value)} />
                                    </span>
                                </div>
                            </div>

                            {/* <div className="col-12 col-md-6 col-lg-6">
                                <div className="loginField">
                                    <span className="inputField">
                                        <input type="text" placeholder="Address" maxLength={30} value={address} onChange={(e) => setAddress(e.target.value)} />
                                    </span>
                                </div>
                            </div> */}
                            
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="loginField">
                                    <span className="inputField">
                                        <input type="text" placeholder="Country" maxLength={30} value={country} onChange={(e) => setCountry(e.target.value)} />
                                    </span>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="addProperty_image">
                                    <div className="upload_box">
                                        <img src="assets/images/upload-blue.png" alt="" />
                                        <p className="smallPara">Upload store Image</p>
                                    </div>
                                    <div className="form-group">
                                        <label />
                                        <input type="file" accept='.png, .jpg, .jpeg' size={80} className="upload-img form-control" name="images[]" multiple onChange={handleFileChange} />
                                    </div>
                                </div>
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
                            <div className="col-12 col-md-6 col-lg-6">
                                <div className="img-thumbs img-thumbs-hidden img-preview" />
                            </div>

                            <div className="col-12 col-md-12 col-lg-12">
                                <button type='submit' className="cta">Update</button>
                            </div>
                        </div>

                    </form>
                </div>
            </section>
        </div>
    )
}
export default EditProfile