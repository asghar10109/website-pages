import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, getUserStatus } from '../store/slices/userSlice'
import moment from 'moment'
import { addProduct, getServies } from '../store/featureActions'
import { useNavigate } from 'react-router-dom'
import { handleNumberInput } from '../utils/helper'
import Select from 'react-select'

const AddService = () => {
    const [title, settitle] = useState("");
    const [servicesImage, setservicesImage] = useState([]);
    const [servicestartdate, setservicestartdate] = useState("");
    const [serviceenddate, setserviceenddate] = useState("");
    const [starttime, setstarttime] = useState("");
    const [endtime, setendtime] = useState("");
    const [category, setcategory] = useState([]);
    const [slottime, setslottime] = useState(null);
    const [service_description, setservice_description] = useState("");
    const [service_price, setservice_price] = useState("");
    const [data, setData] = useState([])
    const navigate = useNavigate();
    const profile = useSelector(getProfile);
    const dispatch = useDispatch();
    const status = useSelector(getUserStatus);
    const [modalType, setModalType] = useState("")

    function viewModal(item, type) {
        setModalType(type)
        if (type == "addProduct") {
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("here");
        console.log("category", category);
        console.log("servicesImage", servicesImage);
        console.log("servicestartdate", servicestartdate);
        console.log("servicestartdate", servicestartdate);
        console.log("starttime", starttime);
        console.log("endtime", endtime);

        try {
            const data = new FormData();
            data.append("title", title);
            data.append("servicestartdate", moment(servicestartdate).format('DD-MMM-YYYY'));
            data.append("serviceenddate", moment(serviceenddate).format('DD-MMM-YYYY'));
            data.append("starttime", starttime);
            data.append("endtime", endtime);
            data.append("category", JSON.stringify(category?.map((item) => item?.value)));
            data.append("slottime", slottime?.value);
            data.append("service_description", service_description);
            data.append("service_price", service_price);
            servicesImage.forEach((item) => {
                console.log(item)
                data.append("servicesImage", item);
            });
            let payload = {
                body: data,
                params: false,
                isToast: true,
            };
            await dispatch(addProduct(payload)).unwrap();
            await getServices()
            settitle("");
            setservicesImage([]);
            setservicestartdate("");
            setserviceenddate("");
            setstarttime("");
            setendtime("");
            setcategory([]);
            setslottime(null);
            setservice_description("");
            setservice_price("");
            setModalType("")
            navigate('/store/services')
        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
        }
    };

    const onFileChange = (e) => {
        console.log(e);
        const selectedImages = e.target.files;
        const imagesArray = [];

        for (let i = 0; i < selectedImages.length; i++) {
            imagesArray.push(selectedImages[i]);
        }
        setservicesImage(servicesImage.concat(imagesArray));
    };

    const handleImageRemove = (e, index) => {
        e.preventDefault();
        console.log("workingggg");
        const updatedImages = [...servicesImage];
        updatedImages.splice(index, 1);

        setservicesImage(updatedImages);
    };

    const getServices = async () => {
        try {
            let payload = {
                params: profile?._id,
                body: false,
            };
            const response = await dispatch(getServies(payload)).unwrap();

            setData(response?.data?.data[0]?.services)

        } catch (rejectedValueOrSerializedError) {
            console.log(rejectedValueOrSerializedError);
        }
    }

    const disabledButton = () => {
        if (!servicestartdate || !serviceenddate || !starttime || !endtime || !category || !slottime || !service_price || !title) {
            return true
        }
        else {
            return false
        }
    }

    useEffect(() => {
        getServices()
    }, [])

    return (

        <>
            <div>
                {
                    modalType == 'addProduct' &&
                    <Modal
                        show={true}
                        onHide={() => setModalType("")}
                        backdrop="static"
                        keyboard={false}
                        centered
                        className=' addProduct_Modal'
                    >
                        <Modal.Header>
                            <h5 className="modal-title" id="exampleModalLabel">
                                Add Service
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={()=>setModalType("")}
                            />
                        </Modal.Header>

                        <Modal.Body>
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="custom-calender calendar" id="calendar" />
                                    </div>
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
                                        {servicesImage?.map((image, index) => (
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
                                    <div className="col-6">
                                        <div className="addProduct_Field">
                                            <label htmlFor="startDate">Start Date</label>
                                            <input
                                                type="date"
                                                value={servicestartdate}
                                                onChange={(e) => setservicestartdate(e.target.value)}
                                                placeholder="Start Date"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="addProduct_Field">
                                            <label htmlFor="endDate">End Date</label>
                                            <input type="date" value={serviceenddate}
                                                onChange={(e) => setserviceenddate(e.target.value)} min={servicestartdate} placeholder="End Date" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="addProduct_Field">
                                            <label htmlFor="startTime">Start Time</label>
                                            <input
                                                type="time"
                                                value={starttime}
                                                onChange={(e) => setstarttime(e.target.value)}
                                                placeholder="Start Time"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="addProduct_Field">
                                            <label htmlFor="endTime">End Time</label>
                                            <input type="time" value={endtime}
                                                onChange={(e) => setendtime(e.target.value)} placeholder="End Time" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="addProduct_Field">
                                            <label htmlFor="slotTime">Slot Time</label>
                                            <Select
                                                isSearchable={false}
                                                className="theme-select"
                                                classNamePrefix="react-select"
                                                placeholder="Slot time"
                                                closeMenuOnSelect={false}
                                                options={[
                                                    { label: "30", value: "30" },
                                                    { label: "60", value: "60" },
                                                    { label: "90", value: "90" },
                                                    { label: "120", value: "120" }
                                                ]}
                                                onChange={(value) => setslottime(value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="addProduct_Field">
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
                                    </div>
                                    <div className="col-6">
                                        <div className="addProduct_Field">
                                            <label htmlFor="price">Price</label>
                                            <input
                                                className="mb-20"
                                                type="text"
                                                value={service_price}
                                                onKeyDown={handleNumberInput}
                                                maxLength={6}
                                                onChange={(e) => setservice_price(e.target.value)} placeholder="Price" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="addProduct_Field">
                                            <label htmlFor="title">Title</label>
                                            <input
                                                className="mb-20"
                                                type="text"
                                                value={title}
                                                maxLength={30}
                                                onChange={(e) => settitle(e.target.value)} placeholder="Title" />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="addProduct_Field">
                                            <textarea
                                                placeholder="Description"
                                                value={service_description}
                                                onChange={(e) => setservice_description(e.target.value)}
                                                maxLength={300}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="cta"
                                    data-bs-dismiss="modal"
                                    data-bs-toggle="modal"
                                    data-bs-target="#accoutDetailModal"
                                    disabled={disabledButton()}
                                >
                                    Submit
                                </button>
                            </form>
                        </Modal.Body>
                    </Modal>

                }
            </div>

            <div>
                <section className="content-section">
                    <div className='d-flex justify-content-between'>
                        <div className="titleSect ">
                            <h3>{profile?.firstname} {profile?.lastname}</h3>
                        </div>
                        <div className="">
                            <button style={{ height: '55px', borderRadius: '50px' }} className="cta" data-bs-toggle="modal" data-bs-target="#addProductModal" onClick={() => viewModal(null, "addProduct")}>
                                Add Service
                            </button>
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}

export default AddService