import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProfile } from "../store/slices/userSlice"
import moment from 'moment'
import { useNavigate } from "react-router-dom"
import { addProduct, getRooms } from "../store/featureActions"
import Select from 'react-select'
import { handleNumberInput } from "../utils/helper"
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
const Room = () => {
    const dispatch = useDispatch()
    const [rooms, setRooms] = useState()
    const [roomImage, setRoomImage] = useState([])
    const [amenities, setAmenities] = useState([])
    const [priceperday, setPriceperday] = useState()
    const [category, setcategory] = useState([])
    const [rules, setrules] = useState(null)
    const [price, setprice] = useState("")
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const profile = useSelector(getProfile)


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append("storeid", profile?._id);
            data.append("rooms", rooms);
            data.append("amenities", JSON.stringify(amenities.map((item) => item)));
            data.append("priceperday", priceperday);
            data.append("category", JSON.stringify(category?.map((item) => item?.value)));
            data.append("rules", rules);
            data.append("price", price);
            roomImage.forEach((item) => {
                data.append("roomImage", item);
            });
            let payload = {
                body: data,
                params: false,
                isToast: true,
            };
            console.log("payload", payload)
            await dispatch(addProduct(payload)).unwrap();
            await getRoomsServices()
            setRooms(null);
            setRoomImage([]);
            setAmenities([]);
            setPriceperday("");
            setrules("");
            setcategory([]);
            setprice(null);

        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
        }
    }

    const onFileChange = (e) => {
        console.log(e);
        const selectedImages = e.target.files;
        const imagesArray = [];

        for (let i = 0; i < selectedImages.length; i++) {
            imagesArray.push(selectedImages[i]);
        }
        setRoomImage(roomImage.concat(imagesArray));
    }

    const handleImageRemove = (e, index) => {
        e.preventDefault()
        const updatedImages = [...roomImage]
        updatedImages.splice(index, 1)
        setRoomImage(updatedImages)
    }

    const getRoomsServices = async () => {
        try {
            let payload = {
                params: profile?._id,
                body: false,
            };
            const response = await dispatch(getRooms(payload)).unwrap();
            setData(response?.data?.data[0]?.rooms)

        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
        }
    }

    const disabledButton = () => {
        if (!rooms || !amenities || !priceperday || !rules || !category || !price) {
            return true
        }
        else {
            return false
        }
    }
    const handleKeyDown = (e) => {
        const regex = /^[0-9]*\.?[0-9]*$/; // Regular expression to allow only numbers and decimal
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
        if (e.key === '.' && e.target.value.includes('.')) {
            // Prevent entering more than one decimal point
            e.preventDefault();
        }
        if (!regex.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    };


    useEffect(() => {
        getRoomsServices()
    }, [])

    console.log(amenities)


    return (
        <>



            <div class="modal fade addProduct_Modal" id="AddRoomCategoryModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add Room Category</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form onSubmit={handleSubmit} class="addProduct_ModalForm">
                                <div class="row">
                                    <div className="col-12">
                                        <div className="addProperty_image">
                                            <div className="upload_box">
                                                <p className="smallPara">Upload Image</p>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="image" />
                                                <input
                                                    type="file"
                                                    onChange={onFileChange}
                                                    className="upload-img form-control"
                                                    name="images[]"
                                                    multiple
                                                />
                                            </div>
                                        </div>
                                        <div className="img-thumbs img-thumbs-hidden img-preview" />
                                        {roomImage?.map((image, index) => (
                                            <div
                                                style={{
                                                    display: "inline",
                                                    position: "relative",
                                                }}
                                                key={index}
                                            >
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt={`Image ${index}`}
                                                    style={{
                                                        width: "70px",
                                                        height: "70px",
                                                        borderRadius: "20px",
                                                        marginBottom: "10px",
                                                        marginRight: "50px",
                                                    }}
                                                />
                                                <button
                                                    style={{
                                                        borderRadius: "100%",
                                                        position: "absolute",
                                                        right: "67px",
                                                        marginTop: "10px",
                                                    }}
                                                    onClick={(e) => handleImageRemove(e, index)}
                                                >
                                                    <i
                                                        style={{
                                                            color: "white",
                                                            backgroundColor: "black",
                                                        }}
                                                        className="fas fa-trash-alt"
                                                    ></i>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div class="col-12">
                                        <label htmlFor="category">Category</label>
                                        <Select
                                            className="theme-select"
                                            classNamePrefix="react-select"
                                            placeholder="Select category"
                                            closeMenuOnSelect={false}
                                            isMulti
                                            options={[
                                                {
                                                    label: "category 1",
                                                    value: "category 1"
                                                },
                                                { label: "category 2", value: "category 2" },
                                                { label: "category 3", value: "category 3" },
                                                { label: "category 4", value: "category 4" }
                                            ]}
                                            onChange={(value) => setcategory(value)}
                                        />
                                    </div>
                                    <div class="col-12">
                                        <div class="addProduct_Field">
                                            <input type="text" placeholder="No of Rooms" maxLength={4} onKeyDown={handleKeyDown} value={rooms} onChange={(e) => setRooms(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <label htmlFor="category">Price Per Day</label>
                                        <select
                                            className="form-control"
                                            value={priceperday}
                                            onChange={(e) => setPriceperday(e.target.value)}
                                        >
                                            <option value="" disabled selected>Select Price Per Day</option>
                                            <option value="perday">Price Per Day</option>
                                            <option value="perweek">Price Per Week</option>
                                            <option value="permonth">Price Per Month</option>
                                            <option value="peryear">Price Per Year</option>
                                        </select>
                                    </div>
                                    <div class="col-12">
                                        <div class="addProduct_Field">
                                            <input type="text" placeholder="Price" maxLength={6} onKeyDown={handleKeyDown} value={price} onChange={(e) => setprice(e.target.value)} />
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="addProduct_Field">
                                            {/* <input type="text" placeholder="Amenities" value={amenities} onChange={(e) => setAmenities(e.target.value)} /> */}
                                            <TagsInput placeholder="Amenities" value={amenities} onChange={(tags) => setAmenities(tags)} />
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="addProduct_Field">
                                            <textarea name="" placeholder="Description" maxLength={275} value={rules} onChange={(e) => setrules(e.target.value)}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" disabled={disabledButton()} class="cta" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#accoutDetailModal">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <section className="content-section">
                    <div className="titleSect d_flexSpacebetween">
                        <h3>Hello Martin!</h3>
                        <div className="categorySelect d_flexSpacebetweenGap">
                            <a href="#" className="cta" data-bs-toggle="modal" data-bs-target="#AddRoomCategoryModal">Add Room Category</a>
                            {/* <select name id>
                                <option value={0}>Select Category</option>
                                <option value={1}>Select Category</option>
                                <option value={2}>Select Category</option>
                            </select> */}
                        </div>
                    </div>
                    <div className="hotel-categorySect table-responsive mt-5">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Price Per Day</th>
                                    <th scope="col">Price Package</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Ratings</th>
                                    <th scope="col" />
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data?.map((ele, index) => {
                                        return (
                                            <> <tr>
                                                <th>{index + 1}</th>
                                                <td><p className="price">{ele?.price}</p></td>
                                                <td><p className="price">{ele?.priceperday}</p></td>
                                                <td>{ele?.category}</td>
                                                <td><i className="fa-solid fa-star" style={{ color: '#ff9900' }} /> 4.5</td>
                                                <td>
                                                    <a onClick={(e) => { navigate(`/store/hotelroom-detail/${ele?.room_id}`);
                                                    }} className="price">View Details</a>
                                                </td>
                                            </tr>

                                            </>)
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </section>


            </div>
        </>
    );
};

export default Room;
