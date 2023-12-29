
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom"
import { deleteServiceById, editServiceById, getRoomById, deleteRoom, editRoom } from '../store/featureActions'
import PlaceholderImage from '../assets/images/placeholder.jpg'
import { Modal } from 'react-bootstrap'
import moment from 'moment'
import Select from 'react-select'
import { handleNumberInput } from '../utils/helper'
import { getProfile } from '../store/slices/userSlice'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
const RoomDetails = () => {
    const dispatch = useDispatch()
    const { id: roomId } = useParams()
    const [data, setData] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)

    const getRoom = async () => {
        try {
            let payload = {
                params: roomId,
                body: false,
            };
            const response = await dispatch(getRoomById(payload)).unwrap();
            setData(response?.data?.data)
        }
        catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
        }
    }

    useEffect(() => {
        getRoom()
    }, [])


    return (
        <>
            <section className="content-section">
                <div className="titleSect d_flexSpacebetween">
                    <h3>Rooms Detail</h3>
                </div>
                <div className="roomDetail-sect">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-6">
                            <form action className="user-desc">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="userInputs">
                                            <label htmlFor>Category</label>
                                            <input readOnly type="text" value={data?.category || "-"} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="userInputs">
                                            <label htmlFor>Price Category</label>
                                            <input readOnly type="text" value={data?.priceperday || "-"} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="userInputs">
                                            <label htmlFor>Price</label>
                                            <input readOnly type="text" value={'$' + data?.price || "-"} />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="userInputs mb-0">
                                            <label htmlFor>Amenities</label>
                                            <ul className="Amenities p-0">
                                                {
                                                    data?.amenities?.map((item) => (
                                                        <li>
                                                            <img src={require("../assets/images/house-building.png")} alt="" />
                                                            <span>{item}</span>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="userInputs">
                                            <label htmlFor>Description</label>
                                            <textarea readOnly value={data?.rules || '-'} />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-12 col-md-6 col-lg-6">
                            <div className="d_flexSpacebetween mb-2">
                                <p className="paraTitle">Images</p>
                                <div className="edit-delSect">
                                    <a href="javascript:void(0)" className="edit-icon" data-bs-toggle="modal" data-bs-target="#deleteProductModal" onClick={() => setDeleteModal(true)}><img src={require("../assets/images/trash.png")} alt="" /></a>
                                    <a href="javascript:void(0)" className="edit-icon" data-bs-toggle="modal" data-bs-target="#editRoomdetailModal" onClick={() => setEditModal(true)}><img src={require("../assets/images/edit.png")} alt="" /></a>
                                </div>
                            </div>
                            <div className="row">
                                {
                                    data?.roomImage?.map((item, index) => (
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                            <div className="room_images">
                                                <img src={`${process.env.REACT_APP_APIURL}${item}`} alt="" onError={(e) => e.target.src = PlaceholderImage} />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} roomId={roomId} data={data} />
            <EditModal editModal={editModal} setEditModal={setEditModal} roomId={roomId} data={data} getRoom={getRoom} />
        </>
    )
}

const DeleteModal = ({ deleteModal, setDeleteModal, roomId, data }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deleteItem = async (e) => {
        try {
            let payload = {
                params: roomId,
                body: false,
                isToast: true,
            };
            const response = await dispatch(deleteRoom(payload)).unwrap();
            setDeleteModal(false)
            navigate("/store/rooms")
        }
        catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
        }
    }

    return (
        <Modal
            show={deleteModal}
            centered
            onHide={() => setDeleteModal(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>Room Detail</Modal.Title>
                {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" /> */}
            </Modal.Header>

            <Modal.Body>
                <div className="Product_modalDetail">
                    <div className="Product_modalDetail_sect1 mb-3 d-flex flex-column align-items-center justify-content-center">
                        <div className="ProdImg mb-3" style={{ width: "150px", height: "150px", borderRadius: '50%', overflow: "hidden" }}>
                            <img className='h-100 w-100' style={{ objectFit: "cover", objectPosition: "center", borderRadius: '50%' }} src={`${process.env.REACT_APP_APIURL}${data?.roomImage[0]}`} alt="" onError={(e) => e.target.src = PlaceholderImage} />
                        </div>
                        <p className="prod_name mb-2">{data?.priceperday || '-'}</p>
                        <p className="price mb-2">${data?.price || '-'}</p>
                    </div>
                    <p className="prodDesc">{data?.rules || '-'}</p>
                    <div className="modal_btnSect">
                        <button className="cta">Edit</button>
                        <button onClick={deleteItem} className="cta ctaDel">Delete</button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

const EditModal = ({ editModal, setEditModal, roomId, data, getRoom }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [rooms, setRooms] = useState("")
    const [roomImage, setRoomImage] = useState([])
    const [amenities, setAmenities] = useState([])
    const [priceperday, setPriceperday] = useState("")
    const [category, setcategory] = useState([])
    const [rules, setrules] = useState(null)
    const [price, setprice] = useState("")
    const profile = useSelector(getProfile);

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
    }

    const resetForm = () => {
        setRooms("");
        setRoomImage([]);
        setAmenities([]);
        setPriceperday("");
        setrules("");
        setcategory([]);
        setprice("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = new FormData();
            data.append("storeid", profile?._id);
            data.append("rooms", rooms);

            data.append("amenities", amenities?.length > 0 ? JSON.stringify(amenities.map((item) => item)) : undefined);
            data.append("priceperday", priceperday);
            data.append("category", category?.length > 0 ? JSON.stringify(category?.map((item) => item?.value)) : undefined);
            data.append("rules", rules);
            data.append("price", price);
            data.append("_id", roomId);
            roomImage.forEach((item) => {
                data.append("roomImage", item);
            });
            let payload = {
                body: data,
                params: false,
                isToast: true,
            };

            await dispatch(editRoom(payload)).unwrap();
            await getRoom()
            setEditModal(false)
            resetForm()
        }
        catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError)
        }


    }

    const populateFields = () => {
        setRooms(data?.rooms)
        setAmenities(data?.amenities)
        setPriceperday(data?.priceperday)
        setcategory(data?.category?.map((item) => ({ label: item, value: item })))
        setrules(data?.rules)
        setprice(data?.price)
    }

    useEffect(() => {
        if (data) {
            populateFields()

        }
    }, [data])

    console.log(amenities)

    return (
        <Modal
            show={editModal}
            centered
            onHide={() => setEditModal(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit Room Service</Modal.Title>
            </Modal.Header>

            <Modal.Body>
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
                                value={category}
                                options={[
                                    { label: "category 1", value: "category 1" },
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
                    <button type="submit" class="cta" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#accoutDetailModal">Submit</button>
                </form>
            </Modal.Body>
        </Modal>

        // <div className="modal fade addProduct_Modal" id="deleteProductModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        //   <div className="modal-dialog modal-dialog-centered">
        //     <div className="modal-content">
        //       <div className="modal-header">
        //         <h5 className="modal-title" id="exampleModalLabel">Service Detail</h5>
        //         <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        //       </div>
        //       <div className="modal-body">
        //         <div className="Product_modalDetail">
        //           <div className="Product_modalDetail_sect1 mb-3 d-flex flex-column align-items-center justify-content-center">
        //             <div className="ProdImg mb-3" style={{ width: "150px", height: "150px", borderRadius: '50%', overflow: "hidden" }}>
        //               <img className='h-100 w-100' style={{ objectFit: "cover", objectPosition: "center", borderRadius: '50%' }} src={`${process.env.REACT_APP_APIURL}${data?.servicesImage[0]}`} alt="" onError={(e) => e.target.src = PlaceholderImage} />
        //             </div>
        //             <p className="prod_name mb-2">{data?.title || '-'}</p>
        //             <p className="price mb-2">${data?.price || '-'}</p>
        //           </div>
        //           <p className="prodDesc">{data?.description || '-'}</p>
        //           <div className="modal_btnSect">
        //             <button className="cta">Edit</button>
        //             <button onClick={deleteItem} className="cta ctaDel">Delete</button>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
    )
}

export default RoomDetails